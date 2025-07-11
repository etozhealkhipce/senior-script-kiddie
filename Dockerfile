FROM node:20-alpine as base

###################
# DEPS
###################

FROM base AS deps
WORKDIR /deps

COPY package.json package.lock* ./

RUN yarn install --force --frozen-lockfile && yarn cache clean --force

###################
# BUILD
###################

FROM base AS build
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
COPY --from=build /build/nginx.conf /etc/nginx/nginx.conf.template

RUN envsubst '${API_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]