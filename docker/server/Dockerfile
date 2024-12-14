FROM node:20.15.1-alpine3.10

WORKDIR /home

COPY ./package.json ./
COPY ./server ./server
COPY ./shared ./shared

RUN npm install

CMD ["npm", "start:prod:server"]
