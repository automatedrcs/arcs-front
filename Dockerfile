# Build stage
FROM node:18-slim AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the Vite+React app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production-stage

# Copy the built app
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
