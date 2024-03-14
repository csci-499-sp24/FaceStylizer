import torch
from torchvision import transforms, utils
from PIL import Image
import math
import random
import os
import sys

import numpy as np
from torch import nn, autograd, optim
from torch.nn import functional as F
from tqdm import tqdm
import wandb

from copy import deepcopy

# Plotting Dependencies
import matplotlib
import matplotlib.pyplot as plt


# JojoGAN Dependencies 
JOJOGAN_DIR = os.path.abspath("JoJoGAN/")
sys.path.append(JOJOGAN_DIR)

from model import *
from e4e_projection import projection as e4e_projection
from util import *
from util import ensure_checkpoint_exists

def main():
    # 0) Setup
    setup()

    # 1) Load Pretrained StyleGAN
    LATENT_DIM = 512
    DEVICE = 'cpu'
    orig_generator, orig_mean_latent, test_generator, transform = load_pretrained_stylegan(LATENT_DIM, DEVICE)
    
    # 2) Process Source Image
    INPUT_FILENAME = 'iu.jpeg'
    FILEPATH = f'JoJoGAN/test_input/{INPUT_FILENAME}'
    aligned_face, test_latent_space = setup_source_image(FILEPATH, DEVICE)
    aligned_face.save("sample.jpg")

    # 3) Load Pretrained Model into Generator for finetuning
    PRETRAINED = 'disney'
    PRETRAINED_MODEL = f'{PRETRAINED}_preserve_color.pt'
    ckpt = torch.load(os.path.join('JoJoGAN/models', PRETRAINED_MODEL), map_location=lambda storage, loc: storage)
    test_generator.load_state_dict(ckpt["g"], strict=False)

    # 4) Train Pretrained Generator on Source Image
    SEED = 3000
    N_SAMPLE = 5
    output_style = train_pretrained_generator_on(SEED,
                                                 N_SAMPLE, 
                                                 LATENT_DIM, 
                                                 DEVICE, 
                                                 orig_generator, 
                                                 orig_mean_latent, 
                                                 test_generator, 
                                                 test_latent_space)

    # 5) Concatenate Output (Base Style - Base Input Face - Stylized Face)
    pretrained_style_reference, input_base_face, output_tensor = concat_output(PRETRAINED, aligned_face, output_style, transform, DEVICE)
    save_image(pretrained_style_reference, "1_pretrained_reference.jpg")
    save_image(input_base_face, "2_input_face.jpg")
    save_image(output_style, "3_stylized_face.jpg")
    save_image(output_tensor, "4_results.jpg", (1028, 3080, 3), 3)

def setup():
    # Set CUDNN benchmark to use pytorch
    torch.backends.cudnn.benchmark = True

    # Set Local Directories
    os.makedirs('JoJoGAN/inversion_codes', exist_ok=True)
    os.makedirs('JoJoGAN/style_images', exist_ok=True)
    os.makedirs('JoJoGAN/style_images_aligned', exist_ok=True)
    os.makedirs('JoJoGAN/models', exist_ok=True)

    # Ensure checkpoint models are downloaded
    ensure_checkpoint_exists('JoJoGAN/models/stylegan2-ffhq-config-f.pt')
    ensure_checkpoint_exists('JoJoGAN/models/dlibshape_predictor_68_face_landmarks.dat')
    ensure_checkpoint_exists('JoJoGAN/models/e4e_ffhq_encode.pt')
    ensure_checkpoint_exists('JoJoGAN/models/disney_preserve_color.pt')

def load_pretrained_stylegan(latent_dim, device):
    # Load original generator
    original_generator = Generator(1024, latent_dim, 8, 2).to(device)
    ckpt = torch.load('JoJoGAN/models/stylegan2-ffhq-config-f.pt', map_location=lambda storage, loc: storage)
    original_generator.load_state_dict(ckpt["g_ema"], strict=False)
    mean_latent = original_generator.mean_latent(10000)

    # Generator to be finetuned 
    generator = deepcopy(original_generator)

    transform = transforms.Compose(
            [
                transforms.Resize((1024, 1024)),
                transforms.ToTensor(),
                transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
                ]
            )
    
    return original_generator, mean_latent, generator, transform

def setup_source_image(filepath, device):
    name = strip_path_extension(filepath)+'.pt'

    # Aligns and crops face from the source image
    aligned_face = align_face(filepath)

    # Performs an Encoder 4 Encoder latent space projection
    latent_space = e4e_projection(aligned_face, name, device).unsqueeze(0)
    
    return aligned_face, latent_space 

def train_pretrained_generator_on(seed, n_sample, latent_dim, device, original_generator, original_mean_latent, test_generator, test_latent_space):
    torch.manual_seed(seed)
    res = None

    with torch.no_grad():
        test_generator.eval()
        z = torch.randn(n_sample, latent_dim, device=device)

        original_sample = original_generator([z], truncation=0.7, truncation_latent=original_mean_latent)
        sample = test_generator([z], truncation=0.7, truncation_latent=original_mean_latent)

        original_my_sample = original_generator(test_latent_space, input_is_latent=True)
        res = test_generator(test_latent_space, input_is_latent=True)

    return res

def concat_output(pretrained, aligned_face, stylized_face, transform, device):
    # Get reference images from pretrained
    style_path = ""
    if pretrained == 'arcane_multi':
        style_path = f'JoJoGAN/style_images_aligned/arcane_jinx.png'
    elif pretrained == 'sketch_multi':
        style_path = f'JoJoGAN/style_images_aligned/sketch.png'
    else:
        style_path = f'JoJoGAN/style_images_aligned/{pretrained}.png'
    
    # Build output
    pretrained_style_image = transform(Image.open(style_path)).unsqueeze(0).to(device)
    base_face = transform(aligned_face).unsqueeze(0).to(device) 
    output = torch.cat([pretrained_style_image, base_face, stylized_face], 0)
    
    return pretrained_style_image, base_face, output

def save_image(image, filename, shape=(1024, 1024, 3), rows=1, size=None, mode='nearest', unnorm=False, title=''):
    # image is [3,h,w] or [1,3,h,w] tensor [0,1]
    # if not isinstance(image, torch.Tensor):
    #     image = transforms.ToTensor()(image).unsqueeze(0)
    # if image.is_cuda:
    #     image = image.cpu()
    # if size is not None and image.size(-1) != size:
    #     image = F.interpolate(image, size=(size,size), mode=mode)
    # if image.dim() == 4:
    #     image = image[0]

    # make_grid on image
    grid = utils.make_grid(image, normalize=True, nrow=rows)
    image = grid.permute(1, 2, 0).detach().numpy()
    
    # Reshape numpy arrays for PIL
    array = np.reshape(image, shape) 
    array = (255 * array).astype(np.uint8)

    # Save image
    img = Image.fromarray(array, 'RGB')
    img.save(filename)

if __name__ == "__main__":
    main()
