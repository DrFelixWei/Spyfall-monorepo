FROM node:20.15.1-alpine3.10

WORKDIR /home

COPY ./package.json ./
COPY ./client ./client
COPY ./shared ./shared

RUN npm install

CMD ["npm", "start:prod:client"]
