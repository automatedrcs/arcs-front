# Stage 1: Build the React Remix application
FROM node:14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the Remix application from Nginx
FROM nginx:alpine

# Copy the built assets from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration (assuming you have a configured nginx.conf in your project root)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
