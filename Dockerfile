# Build stage
FROM node:18-slim AS build-stage

WORKDIR /usr/src/app

COPY .env ./

COPY package*.json ./

RUN npm install

COPY . .

# Build the Astro app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production-stage

# Copy the built Astro app
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
