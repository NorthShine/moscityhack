FROM node:14.18.2
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build