# Stage 1: Build the Angular app
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration production

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/seek_app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
