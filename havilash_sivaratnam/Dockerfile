FROM node:alpine

COPY ./client /app
WORKDIR /app

RUN npm install
CMD npm run start --port 3000