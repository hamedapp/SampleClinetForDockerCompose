# Stage 1
FROM node:latest as node
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/sample-clinet-for-docker-compose /usr/share/nginx/html
EXPOSE 80