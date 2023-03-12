
FROM node:18.3.0 as dev

WORKDIR /opt/app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build


###########################################
# package up only the app
###########################################
FROM docker.io/bitnami/nginx:1.23

COPY nginx_server_block.conf /opt/bitnami/nginx/conf/server_blocks/nginx_server_block.conf
WORKDIR /app

# use dist from previous stage
COPY --from=dev /opt/app/build/ .

EXPOSE 8080