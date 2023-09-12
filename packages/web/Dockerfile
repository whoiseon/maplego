FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies based on the preferred package manager
COPY ./ ./

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
