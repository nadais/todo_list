FROM node:10-alpine

WORKDIR /usr/src/app
COPY ./package*.json ./

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm","start" ]