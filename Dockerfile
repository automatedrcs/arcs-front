# Stage 1: Build the React Remix application
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the Remix application as a Node.js app
FROM node:18

WORKDIR /app

# Copy package.json and the built assets from the build stage
COPY package*.json ./
COPY --from=build /app/build ./build

# You can install production-only dependencies here
RUN npm ci --only=production

# Expose the port your app runs on
EXPOSE 3000

# Start the Remix server
CMD ["npm", "start"]
