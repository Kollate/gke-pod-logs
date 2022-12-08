FROM node:16.13.1-alpine
RUN apk update && apk upgrade
RUN apk add --no-cache --virtual build-dependencies build-base
RUN apk add --no-cache tini bash

EXPOSE 3000

WORKDIR /app
ENTRYPOINT ["/sbin/tini", "--"]

COPY package*.json ./

RUN npm ci
# disable npm update check
ENV NO_UPDATE_NOTIFIER true

ENV TERM=xterm-256color \
    NODE_ENV=production \
    PORT=8080

COPY . .
RUN npm run build
CMD ["node", "-r", "module-alias/register", "-r", "source-map-support/register", "dist/src/index.js"]

