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

def generateCustomStyle():
    images = ['clown3.jpg']
    src_image = 'static/uploads/image.jpg'
    targets = []
    latents = []
    
    # 1) Process Source Image: Crop and Align Face
    aligned_face, test_latent_space = setup_source_image(src_image)

    # 1) Load Pretrained StyleGAN 
    LATENT_DIM = 512
    DEVICE = 'cpu'
    orig_generator, orig_mean_latent, test_generator, transform = load_pretrained_stylegan(LATENT_DIM, DEVICE)

    for imgName in images:
        style_path = os.path.join('JoJoGAN/style_images', imgName)
        assert os.path.exists(style_path), f"{style_path} does not exist!"

        imgName = strip_path_extension(imgName)
        
        
        # 1) Process Style Image: Crop and Align Face
        style_aligned_path = os.path.join('JoJoGAN/style_images_aligned', f'{imgName}.png')
        if not os.path.exists(style_aligned_path):
            style_aligned = align_face(style_path)
            style_aligned.save(style_aligned_path)
        else:
            style_aligned = Image.open(style_aligned_path).convert('RGB')

        # 2) GAN Invert: e4e Projection
        style_code_path = os.path.join('JoJoGAN/inversion_codes', f'{imgName}.pt')
        if not os.path.exists(style_code_path):
            latent = e4e_projection(style_aligned, style_code_path, DEVICE)
        else:
            latent = torch.load(style_code_path)['latent']

        targets.append(transform(style_aligned).to(DEVICE))
        latents.append(latent.to(DEVICE)) 

    targets = torch.stack(targets, 0)
    latents = torch.stack(latents, 0)
    target_im = utils.make_grid(targets, normalize=True, nrow=1)
    save_image(target_im, "test.jpeg")

    # 3) Finetune StyleGAN
    # Controls the strength of the style
    alpha = 1
    alpha = 1 - alpha

    # Tries to preserve the color of the original input face
    preserve_color = True

    # Num. of finetuning steps
    num_iter = 2

    # Using wandb
    use_wandb = False
    log_interval = 50

    # Load Discriminator for perceptual loss
    discriminator = Discriminator(1024, 2).eval().to(DEVICE)
    ckpt = torch.load('JoJoGAN/models/stylegan2-ffhq-config-f.pt', map_location=lambda storage, loc: storage)
    discriminator.load_state_dict(ckpt["d"], strict=False)

    # Reset generator
    del test_generator
    test_generator = deepcopy(orig_generator)
    
    # Adam Optimizer
    g_optim = optim.Adam(test_generator.parameters(), lr=2e-3, betas=(0, 0.99))

    # Figuring out which layers to swap based on preserve color property
    id_swap = []
    if preserve_color:
        id_swap = [9,11,15,16,17]
    else:
        id_swap = list(range(7, test_generator.n_latent))
    
    # Finetune StyleGAN on new style
    for idx in tqdm(range(num_iter)):
        mean_w = test_generator.get_latent(torch.randn([latents.size(0), LATENT_DIM]).to(DEVICE)).unsqueeze(1).repeat(1, test_generator.n_latent, 1)
        in_latent = latents.clone()
        in_latent[:, id_swap] = alpha*latents[:, id_swap] + (1-alpha)*mean_w[:, id_swap]

        img = test_generator(in_latent, input_is_latent=True)
        
        with torch.no_grad():
            real_feat = discriminator(targets)
        fake_feat = discriminator(img)
        
        loss = sum([F.l1_loss(a, b) for a, b in zip(fake_feat, real_feat)])/len(fake_feat)

        g_optim.zero_grad()
        loss.backward()
        g_optim.step()

    # 4) Generate Results
    n_sample = 5
    seed = 3000
    torch.manual_seed(seed)
    with torch.no_grad():
        test_generator.eval()
        my_sample = test_generator(test_latent_space, input_is_latent=True)
    
    # 5) Save results
    pretrained_style_reference, input_base_face, output_tensor = concat_output(images[0], aligned_face, my_sample, transform, DEVICE)
    save_image(output_tensor, "output.jpeg", (1028, 3080, 3), 3)
def generatePretrainedStyle(input_filename, input_dir, output_dir, pretrained_model_name):
    res = {
            "model_reference" : "",
            "input_face" : "",
            "stylized" : "",
            "results" : "",
            }
    
    # 0) Setup
    setup()

    # 1) Load Pretrained StyleGAN
    LATENT_DIM = 512
    DEVICE = 'cpu'
    orig_generator, orig_mean_latent, test_generator, transform = load_pretrained_stylegan(LATENT_DIM, DEVICE)
    
    # 2) Process Source Image
    aligned_face, test_latent_space = setup_source_image(input_dir)

    # 3) Load Pretrained Model into Generator for finetuning
    PRETRAINED_MODEL = f'{pretrained_model_name}_preserve_color.pt'
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
    pretrained_style_reference, input_base_face, output_tensor = concat_output(pretrained_model_name, aligned_face, output_style, transform, DEVICE)

    # Save image of pretrained reference style used
    model_reference = f"{output_dir}/{input_filename}_1_pretrained_reference.jpg"
    save_image(pretrained_style_reference, model_reference)
    res["model_reference"] = model_reference

    # Save image of input face
    input_face = f"{output_dir}/{input_filename}_2_input_face.jpg"
    save_image(input_base_face, input_face)
    res["input_face"] = input_face

    # Save image of output stylized face
    stylized = f"{output_dir}/{input_filename}_3_stylized_face.jpg"
    save_image(output_style, stylized)
    res["stylized"] = stylized

    # Save image of combination of above 3
    results = f"{output_dir}/{input_filename}_4_results.jpg"
    save_image(output_tensor, results, (1028, 3080, 3), 3)
    res["results"] = results
    
    return res

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
    ensure_checkpoint_exists('JoJoGAN/models/jojo_preserve_color.pt')
    ensure_checkpoint_exists('JoJoGAN/models/jojo_yasuho_preserve_color.pt')
    ensure_checkpoint_exists('JoJoGAN/models/arcane_jinx_preserve_color.pt')

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

def setup_source_image(filepath):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
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
        # z = torch.randn(n_sample, latent_dim, device=device)

        # original_sample = original_generator([z], truncation=0.7, truncation_latent=original_mean_latent)
        # sample = test_generator([z], truncation=0.7, truncation_latent=original_mean_latent)
        #
        # original_my_sample = original_generator(test_latent_space, input_is_latent=True)
        res = test_generator(test_latent_space, input_is_latent=True)

    return res

def concat_output(pretrained, aligned_face, stylized_face, transform, device):
    # Get reference images from pretrained
    style_path = ""
    if pretrained == 'arcane_multi':
        style_path = f'JoJoGAN/style_images_aligned/arcane_jinx.png'
    elif pretrained == 'sketch_multi':
        style_path = f'JoJoGAN/style_images_aligned/sketch.png'
    elif os.path.exists(f'JoJoGAN/style_images_aligned/{pretrained}.png'):
        style_path = f'JoJoGAN/style_images_aligned/{pretrained}.png'
    else:
        style_path = f'JoJoGAN/style_images/{pretrained}'

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
    # generatePretrainedStyle("JoJoGAN/test_input/chris_hemsworth.jpeg")
    generateCustomStyle()
