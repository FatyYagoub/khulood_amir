# Use the official Node.js Alpine image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container before the other files
COPY ./package*.json ./

# Install PM2 globally
RUN npm install --global pm2

# Install dependencies and PM2
RUN npm install -f 

# Copy the project files into the working directory (container)
COPY ./ ./

# Build the App
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
