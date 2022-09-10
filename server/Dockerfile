# Dockerfile for Node Express Backend

FROM node:14.20.0-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies
RUN npm i

# Bundle app source
COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev"]