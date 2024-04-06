FROM ubuntu:20.04

RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
    make \
    build-essential \
    cmake \
    python3-pip \
    git

# Send print logs to container terminal
ENV PYTHONUNBUFFERED True

# Copy src code over to container
COPY . ./

# Expose PORT
ENV PORT 8080

# Install Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Build DLIB
RUN cd dlib && mkdir build && cd build && cmake ../ && cmake --build . && cd .. && python3 setup.py install

# Start handler
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app

