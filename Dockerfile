# Use Ubuntu 22.04 as the base image
FROM ubuntu:22.04

# Set the working directory in the container
WORKDIR /app

# Install curl and other utilities
RUN apt-get update && apt-get install -y curl gnupg2 build-essential

# Install Node.js version 20.11.0
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Verify node and npm installations
RUN node -v
RUN npm -v

# Your TypeScript project should be in the same directory as this Dockerfile, or adjust the path accordingly
COPY . /app

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app (adjust if your start command is different)
CMD ["npm", "run", "start"]


