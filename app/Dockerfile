FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --save

COPY . .

CMD ["node", "index.js"]
