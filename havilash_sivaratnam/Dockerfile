FROM node:16-alpine as development

ENV NODE_ENV development
ENV PORT 3000


WORKDIR /app
COPY ./frontend .
RUN npm ci

CMD npm run start --port 3000