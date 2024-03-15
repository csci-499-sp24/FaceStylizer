from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from stylizer import generatePretrainedStyle
from fastapi_utilities import repeat_every
import shutil
import glob, os

app = FastAPI()
OUTPUT_DIR = "output_files"

@app.get("/stylizer/getPretrainedStyle", response_class=FileResponse)
async def getPretrainedStyle(inputFile: UploadFile = File(...)):
    # Purge output files directory
    if os.path.isdir(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    
    os.mkdir(OUTPUT_DIR)

    # Writes file to system
    path = f"JoJoGAN/test_input/{inputFile.filename}"
    with open(path, 'w+b') as file:
        shutil.copyfileobj(inputFile.file, file)
    
    # Generate pretrained style on file
    generatePretrainedStyle(inputFile.filename)
    
    # Purge input images
    name = inputFile.filename.split(".")[0]
    for f in glob.glob(f"JoJoGAN/test_input/{name}*"):
        os.remove(f)

    return f"{OUTPUT_DIR}/{inputFile.filename}_4_results.jpg"
