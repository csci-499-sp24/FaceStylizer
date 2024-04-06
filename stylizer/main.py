import os
from flask import Flask, flash, request, render_template, send_file
from numpy import who
from werkzeug.utils import secure_filename
from stylizer import generatePretrainedStyle
from flask_cors import CORS

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'} # not currently used

# Init Flask App
app = Flask(__name__)

# Add CORS middleware for Cross-Origin-Resource-Sharing
CORS(app)

# Add Upload Folder for uploaded images
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