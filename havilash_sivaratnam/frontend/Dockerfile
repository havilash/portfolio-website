FROM node:16-alpine as development

ENV NODE_ENV development
ENV PORT 3000

WORKDIR /app
COPY . .
RUN npm ci

CMD npm start -- --host 0.0.0.0 --port 3000