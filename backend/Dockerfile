FROM node:10-alpine

RUN npm install -g typescript nodemon

WORKDIR /usr/src/app
COPY ./package*.json ./

RUN npm install 

EXPOSE 3200

CMD ["npm", "start"]