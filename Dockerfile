# Stage 1: Base image with multiple language installations
FROM ubuntu:22.04 AS base

# Set environment variables to avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install basic utilities
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    software-properties-common \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Install Java
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    && rm -rf /var/lib/apt/lists/*

# Install C++
RUN apt-get update && apt-get install -y \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install CodeMirror dependencies
RUN npm install -g codemirror

# Stage 2: Application setup
FROM node:18-slim AS app

# Set environment variables
ENV NODE_ENV=production

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Expose the port Render expects
EXPOSE 10000

# Command to run your application
CMD ["npm", "start"]
