FROM node:18
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 8080
CMD ["yarn", "start"]
