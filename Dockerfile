
FROM node:alpine AS build

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build


FROM node:alpine AS prod

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --prod

WORKDIR /app/dist

COPY --from=build /build/dist ./

CMD [ "node", "/app/dist/api.js" ]
