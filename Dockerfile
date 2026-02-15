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

FROM nginx:1.29.0-alpine-slim AS final
WORKDIR /final

ARG API_URL
ENV API_URL=$API_URL

RUN apk update
RUN apk add gettext

COPY --from=build /build/dist ./
COPY --from=build /build/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]