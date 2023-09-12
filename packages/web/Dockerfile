FROM node:18

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# Install dependencies based on the preferred package manager
COPY ./ ./

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
