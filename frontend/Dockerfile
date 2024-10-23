FROM node:20 as build-stage
ENV VITE_API_URL ${API_URL}
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
EXPOSE 5173
CMD [ "nginx", "-g", "daemon off;" ]