# Create image based on the official Node image from dockerhub
FROM node:21-alpine

# Create app directory
WORKDIR /client
 
# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "dev"]

# Copy dependency definitions
COPY package.json/ /client

# Install dependencies
RUN npm install

# Copying src 
COPY . /client/ 
