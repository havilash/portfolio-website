FROM node:16-alpine as development

ENV NODE_ENV development
ENV PORT 3000

WORKDIR /app
COPY ./client .
RUN npm install

CMD npm run start --port 3000