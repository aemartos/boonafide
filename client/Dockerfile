# Dockerfile for React Client

FROM node:14.20.0-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies
RUN npm i

# copy local files to app folder
COPY . .

EXPOSE 3000
CMD ["npm","start"]