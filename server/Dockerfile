FROM node:20-alpine

WORKDIR /app

# Сначала зависимости (кэшируется, пока не меняется package.json).
COPY package.json ./
RUN npm install --omit=dev

# Затем код.
COPY . .

EXPOSE 3001
CMD ["node", "index.js"]
