# Stage 1: сборка React/Vite
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: раздача статики через nginx
FROM nginx:alpine
COPY --from=builder /app/dist /var/www/kazargrad
COPY deploy/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8002
