FROM node:14.18.2 as build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]