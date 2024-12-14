FROM node:23-alpine3.20

WORKDIR /home

COPY ./package.json ./
COPY ./client ./client
COPY ./shared ./shared

RUN npm install

CMD ["npm", "start:prod:client"]
