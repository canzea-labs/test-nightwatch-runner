FROM node:9-alpine

RUN mkdir /testrunner

WORKDIR /testrunner

RUN npm init --force -y

RUN npm --save install nightwatch
RUN npm --save install nconf

COPY config config

ENTRYPOINT ["node_modules/nightwatch/bin/nightwatch", "-c", "config/nightwatch.json"]
