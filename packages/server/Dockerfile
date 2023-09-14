FROM node:18 AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build

FROM node:18-alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=builder /usr/src/app ./

EXPOSE 8080

CMD ["yarn", "start:prod"]
