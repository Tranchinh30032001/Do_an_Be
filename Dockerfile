FROM node:18.6
WORKDIR /app
EXPOSE 8080
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]