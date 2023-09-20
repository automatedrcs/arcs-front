# Use the official Node.js runtime as the base image
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Run the application on port 8080
CMD ["npm", "start"]
