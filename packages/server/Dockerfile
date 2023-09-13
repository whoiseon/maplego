FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 8080
CMD ["node", "dist/main.js"]
