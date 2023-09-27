FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
COPY . ./

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html
