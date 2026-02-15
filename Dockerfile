FROM node:22-alpine as base

###################
# DEPS
###################

FROM base AS deps
WORKDIR /deps

COPY package.json yarn.lock ./

RUN yarn install --force --frozen-lockfile
RUN yarn add esbuild@^0.25.0 --exact

###################
# BUILD
###################

FROM node:22-alpine AS build
WORKDIR /build

ARG API_URL
ENV NODE_ENV production
ENV API_URL=$API_URL

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN yarn build

###################
# FINAL
###################

FROM node:22-alpine AS final
WORKDIR /app

ARG API_URL
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
ENV API_URL=$API_URL

COPY --from=build /build/dist ./dist

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]