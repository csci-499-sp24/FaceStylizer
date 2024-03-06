# Pulls the node-alpine Docker image
FROM node:21-alpine

# Makes a node_modules directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set present working directory
WORKDIR /home/node/app

# Copy package-lock.json and package.json files
COPY package*.json/ ./

# Copy current src code to container
COPY --chown=node:node . .

# Switch USER to node
USER node

# Install dependencies
RUN npm install

# Use port 8080 for server
EXPOSE 8080

# Start server
CMD ["npm", "run", "start"]
