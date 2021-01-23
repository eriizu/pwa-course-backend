from node:alpine as build

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine

WORKDIR /app/dist

COPY --from=build /build/dist ./

WORKDIR /app

COPY . .

RUN yarn --prod

CMD [ "node", "/app/dist/api.js" ]
