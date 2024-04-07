# Setup

## Dependencies
### Create environment
```bash
conda create -n jjgan
conda activate jjgan
pip install -r requirements.txt
```

### Clone dlib
```bash
git clone https://github.com/davisking/dlib.git
```

### Build dlib from source
```bash
cd dlib
mkdir build; cd build; cmake ..; cmake --build .
cd ..
python3 setup.py install
```

## Run Locally
Make directory for uploaded static images to save to
```bash
mkdir static && cd static && mkdir uploads
```
Start Flask Webserver
```bash
python3 main.py
```

## Deploy to Google Cloud Run
0) Install gcloud CLI
1) Create project on Google Cloud & link billing account
2) Declare env variables
```bash
export PROJECT_ID=<YOUR_UNIQUE_LOWER_CASE_PROJECT_ID>
export APP=<APP_NAME>
export REGION="us-east4"
export TAG="gcr.io/$PROJECT_ID/$APP"
```
3) Build Docker image
```bash
docker build -t $TAG .
```
4) Submit Build to Gcloud
```bash
gcloud builds submit --tag $TAG
```
5) Gcloud Deployment
```bash
gcloud run deploy $APP --image $TAG --platform managed --region $REGION --allow-unauthenticated
```