# FaceStylizer

Building a web application around JoJoGAN face stylization.

# Setup 
## 1) Clone the repo ```git clone```
## 2) Setup Server and Client
```
cd /server
npm install
```
- Create .env and add PORT=8080

```
cd /client
```
Create .env.local and add NEXT_PUBLIC_SERVER_URL="http://localhost:8080"

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

Run frontend docker container
```
docker run -d --name=facestylizer-frontend facestylizer/frontend
```

Stop/Down docker containers
```
docker-compose stop # pauses containers
docker-compose down # brings down containers
```
