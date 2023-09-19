# Stage 1: Build the React Remix application
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the Remix application statically
FROM node:18

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy the built assets from the build stage
COPY --from=build /app/build ./build

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]
