FROM node:22-alpine AS base
WORKDIR /app

###################
# DEPS
###################

FROM base AS deps
WORKDIR /deps

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

###################
# BUILD
###################

FROM base AS build
WORKDIR /build

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN yarn build

###################
# PROD DEPS
###################

FROM base AS prod-deps
WORKDIR /prod-deps

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

###################
# FINAL
###################

FROM node:22-alpine AS final
WORKDIR /app

COPY --from=prod-deps /prod-deps/node_modules ./node_modules
COPY --from=build /build/dist ./dist

CMD ["node", "./dist/server/entry.mjs"]