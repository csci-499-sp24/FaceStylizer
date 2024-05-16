# FaceStylizer
Building a web application around JoJoGAN face stylization

https://github.com/csci-499-sp24/FaceStylizer/assets/66185881/ba54c2f8-ef54-412b-a612-333f33fb83a9

# Setup 
## 1) Clone the repo ```git clone```
## 2) Setup Server and Client
```
cd /server
npm install
```
- Create .env and add:
```
PORT=8080
REGION="region"
AWS_SECRET_ACCESS_KEY="secret-access-key"
AWS_ACCESS_KEY_ID="access-key-id"
```

```
cd /client
npm install
```
- Create .env and add:
```
NEXT_PUBLIC_IP = "<IP address of server>"
```

## 3) Start Server and Client
```
cd /server
npm run dev
```
Check that the api route (http://localhost:8080/api/home) shows the Hello World message

```
cd /client
npm run dev
```
Check that the client shows both its static message, and the returned Hello World message from the server.

## 4) Start MongoDB + Server w/ Docker
Install [Docker](https://docs.docker.com/compose/install/)

Starts the MongoDB + Server
```
docker-compose up --build -d
docker ps
```

Interact w/ the container with <strong>mongosh</strong>
```
docker exec -it facestylizer-mongo-1 mongosh admin -u root -p password
```

Stop/Down docker containers
```
docker-compose stop # pauses containers
docker-compose down # brings down containers
```

Unit Testing
```
npm test
```
