FROM node:18.3.0

ENV REDIS_HOST=localhost

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "node", "index.js" ]