FROM node:23-alpine3.20

WORKDIR /home

COPY ./package.json ./
COPY ./server ./server
COPY ./shared ./shared

RUN npm install

CMD ["npm", "start:prod:server"]
