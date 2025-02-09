
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./


RUN npm install --legacy-peer-deps

COPY . .


RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=builder /app/dist/seek_lab /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
