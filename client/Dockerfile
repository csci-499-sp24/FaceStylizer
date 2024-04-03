# Create image based on the official Node image from dockerhub
FROM --platform=linux/amd64 node:18.17-alpine

# Copying src 
COPY . /client/

# Create app directory
WORKDIR /client
 
# Copy dependency definitions
COPY package*.json/ ./

# Install dependencies
RUN npm install
 
# Expose the port the app runs in
EXPOSE 3000
 
# Serve the app
CMD ["npm", "run", "dev"]
