FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./src/migrations/sql ./dist/migrations/sql

EXPOSE 3030

CMD ["npm", "start"]