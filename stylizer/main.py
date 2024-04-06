import os
from flask import Flask, flash, request, render_template, send_file
from numpy import who
from werkzeug.utils import secure_filename
from stylizer import generatePretrainedStyle
import shutil
import glob, os

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')

@app.route("/")
def hello_world():
    return f"Hello from Stylizer!"

@app.route('/upload', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # check if the post request has the image part
        if 'image' in request.files:
            # grab image from request
            file = request.files['image']
            filename = secure_filename(file.filename)
            
            # save file to disk
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            input_img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            # stylize image
            res = generatePretrainedStyle(file.filename, input_img_path, app.config['UPLOAD_FOLDER'])

            # check error from res
            if len(res["error_msg"]) == 0:
                # return render_template('index.html', img=results)
                return send_file(res["results"], mimetype='image/jpg')
            
            print(res["error_msg"])
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

# app = FastAPI()
# OUTPUT_DIR = "output_files"
#
# @app.get("/")
# async def root():
#     return {"message": "Hello From Stylizer!"}
#
# @app.get("/stylizer/getPretrainedStyle", response_class=FileResponse)
# async def getPretrainedStyle(inputFile: UploadFile = File(...)):
#     # Purge output files directory
#     print("Purging output files directory")
#     if os.path.isdir(OUTPUT_DIR):
#         shutil.rmtree(OUTPUT_DIR)
#      
#     os.mkdir(OUTPUT_DIR)
#
#     # Writes file to system
#     print("Writing input file to JoJoGAN/test_input")
#     path = f"JoJoGAN/test_input/{inputFile.filename}"
#     with open(path, 'w+b') as file:
#         shutil.copyfileobj(inputFile.file, file)
#      
#     # Generate pretrained style on file
#     print("Generating pretrained style on input file")
#     res = generatePretrainedStyle(inputFile.filename)
#      
#     # Purge input images
#     print("Purge input images from JoJoGAN/test_input")
#     name = inputFile.filename.split(".")[0]
#     for f in glob.glob(f"JoJoGAN/test_input/{name}*"):
#         os.remove(f)
#
#     return f"{OUTPUT_DIR}/{inputFile.filename}_4_results.jpg"
#
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8080)
