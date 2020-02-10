#########################
### Pruduction  image ###
#########################

### STAGE 1: Build ###

FROM node:12.7.0-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set env variable from docker-compose.yml
ARG REACT_APP_SERVER_HOST
ARG REACT_APP_SERVER_PORT
ENV REACT_APP_SERVER_HOST=$REACT_APP_SERVER_HOST
ENV REACT_APP_SERVER_PORT=$REACT_APP_SERVER_PORT

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build

### STAGE 2: Production Environment ###

FROM nginx:1.17.2-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# defined in docker-compose.yml
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#########################
### Container MGMT    ###
#########################

# docker build -t npm_resolver-webui:1.0 .
# docker run -d --rm -ti -p 80:80 --name npm_resolver-webui-app npm_resolver-webui:1.0
