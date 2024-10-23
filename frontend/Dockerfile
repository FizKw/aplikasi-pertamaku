FROM node:20 
ENV VITE_API_URL ${API_URL}
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
RUN npm install serve -g
RUN npm run build
EXPOSE 5173
CMD [ "npm", "run", "serve" ]
