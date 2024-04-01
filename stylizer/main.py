from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from stylizer import generatePretrainedStyle
import shutil
import glob, os
import uvicorn

app = FastAPI()
OUTPUT_DIR = "output_files"

@app.get("/")
async def root():
    return {"message": "Hello From Stylizer!"}

@app.get("/stylizer/getPretrainedStyle", response_class=FileResponse)
async def getPretrainedStyle(inputFile: UploadFile = File(...)):
    # Purge output files directory
    print("Purging output files directory")
    if os.path.isdir(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
     
    os.mkdir(OUTPUT_DIR)

    # Writes file to system
    print("Writing input file to JoJoGAN/test_input")
    path = f"JoJoGAN/test_input/{inputFile.filename}"
    with open(path, 'w+b') as file:
        shutil.copyfileobj(inputFile.file, file)
     
    # Generate pretrained style on file
    print("Generating pretrained style on input file")
    res = generatePretrainedStyle(inputFile.filename)
     
    # Purge input images
    print("Purge input images from JoJoGAN/test_input")
    name = inputFile.filename.split(".")[0]
    for f in glob.glob(f"JoJoGAN/test_input/{name}*"):
        os.remove(f)

    return f"{OUTPUT_DIR}/{inputFile.filename}_4_results.jpg"


if __name__ == "__main__":
    uvicorn.run(app, port=8080)
