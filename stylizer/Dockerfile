FROM python:3.8

# Send print logs to container terminal
ENV PYTHONUNBUFFERED True

# Set the Working Directory
ENV APP_HOME /
WORKDIR $APP_HOME

# Copy src code over to container
COPY . ./

# Expose PORT
ENV PORT 8080

# Install Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Start handler
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT} --workers 1

