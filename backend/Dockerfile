FROM node:10-alpine

WORKDIR /usr/src/app
COPY ./package*.json ./

RUN npm install -g typescript nodemon

RUN npm install 

EXPOSE 3200
ENTRYPOINT [ "npm","start","||","tail","-f","/dev/null" ]