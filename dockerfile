FROM node:8.11.3-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --production
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]