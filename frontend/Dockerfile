FROM node:20 as build-stage
ENV VITE_API_URL ${API_URL}
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
EXPOSE 80
RUN mkdir /app/frontend
COPY nginx.conf /etc/nginx/default.conf
COPY --from=build-stage /app/frontend/dist /app/frontend