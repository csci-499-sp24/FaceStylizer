# Miniconda image from DockerHub
FROM continuumio/miniconda3

# Set Working Dir
# WORKDIR /

# Copy src code
COPY ./ ./

# Activate conda environment
RUN conda env create -f environment.yml

# Install dependencies for OpenCV
#RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y

# Source activate environment in bashrc config 
RUN echo "source activate jjgan" > ~/.bashrc

# Attach env to PATH
ENV PATH /opt/conda/envs/jjgan/bin:$PATH

# Start the Handler
CMD ["uvicorn", "main:app", "--reload", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]
