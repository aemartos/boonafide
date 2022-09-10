############ Stage 1
FROM node:14.20.0-alpine AS builder

# Create App Directory
WORKDIR /app

# Copy client app
COPY ./client .

# Install client app dependencies
RUN npm i

# Build client app
RUN npm run build


############ Stage 2
FROM node:14.20.0-alpine

# Create final app
WORKDIR /app

# Copy server
COPY ./server .

# Install server dependencies
RUN npm i

# Copies static resources from builder stage
COPY --from=builder /app/build /app/public

EXPOSE 3001
CMD ["npm", "run", "start"]