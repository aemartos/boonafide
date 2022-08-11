FROM node:14.20.0-alpine

# Create App Directory
WORKDIR /usr/src/app

COPY /server/package*.json ./

###  Installing dependencies
RUN npm i

# Bundle app source
COPY . .

# Exec script to build the FE
# COPY client-build.sh ./
# RUN . client-build.sh

EXPOSE 8000
CMD ["npm", "run", "start-prod"]