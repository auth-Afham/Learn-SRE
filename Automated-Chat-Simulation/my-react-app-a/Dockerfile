# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight server for production (e.g., serve)
RUN npm install -g serve

# Expose port 3000 for the app
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]