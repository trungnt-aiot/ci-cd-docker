FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
COPY ./src/migrations/sql ./dist/migrations/sql

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
CMD ["node", "dist/index.js"]
