# Use an official image as a base
FROM node:16

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm install

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]