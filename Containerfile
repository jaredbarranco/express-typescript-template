# Stage 1: Build the application
FROM node:20 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the production dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port (change if necessary)
EXPOSE $PORT

# Command to run the application
CMD ["node", "dist/server.js"]
