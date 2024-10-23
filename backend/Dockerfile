FROM node:20
WORKDIR /app/backend
COPY package*.json ./app/backend
RUN npm install
COPY . /app/backend/
CMD [ "node", "server.js" ]