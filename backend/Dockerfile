FROM node:20
ARG API_URL
ENV VITE_API_URL ${API_URL}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
CMD [ "npm", "run", "start" ]