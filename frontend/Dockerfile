### Stage build ###
FROM node:24-alpine as BUILD

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
### Stage run ###
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf/default.conf
COPY --from=BUILD /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]