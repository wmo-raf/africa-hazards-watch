FROM node:14.20.1-bullseye-slim AS deps
RUN apt-get update && \
    apt-get install -y \
        zlib1g-dev \
        libpng-dev
WORKDIR /app
COPY package*.json .
COPY yarn.lock .

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Install packages
RUN yarn install

# Stage 2: build
FROM node:14.20.1-bullseye-slim AS builder
RUN apt-get update && apt-get install -y libgl1 libxi6
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY public ./public
COPY package.json next.config.js jsconfig.json ./

# Env Variables that should be available at build time
ARG ANALYTICS_PROPERTY_ID
ENV ANALYTICS_PROPERTY_ID $ANALYTICS_PROPERTY_ID

ARG BITLY_TOKEN
ENV BITLY_TOKEN $BITLY_TOKEN

ARG DEBUG
ENV DEBUG $DEBUG

ARG FACEBOOK_PIXEL_ID
ENV FACEBOOK_PIXEL_ID $FACEBOOK_PIXEL_ID

ARG FEATURE_ENV
ENV FEATURE_ENV $FEATURE_ENV

ARG GOOGLE_CUSTOM_SEARCH_CX
ENV GOOGLE_CUSTOM_SEARCH_CX $GOOGLE_CUSTOM_SEARCH_CX

ARG GOOGLE_SEARCH_API_KEY
ENV GOOGLE_SEARCH_API_KEY $GOOGLE_SEARCH_API_KEY

ARG HW_API
ENV HW_API $HW_API

ARG HW_CMS_API
ENV HW_CMS_API $HW_CMS_API

ARG MAPBOX_TOKEN 
ENV MAPBOX_TOKEN $MAPBOX_TOKEN

ARG TWITTER_CONVERSION_ID
ENV TWITTER_CONVERSION_ID $TWITTER_CONVERSION_ID

ARG ASSET_PREFIX
ENV ASSET_PREFIX $ASSET_PREFIX

ARG ECWMF_HRES_TIMESTAMPS_URL
ENV ECWMF_HRES_TIMESTAMPS_URL $ECWMF_HRES_TIMESTAMPS_URL

ARG METADATA_BASE_URL
ENV METADATA_BASE_URL $METADATA_BASE_URL

ARG ECMWF_HRES_TOKEN
ENV ECMWF_HRES_TOKEN $ECMWF_HRES_TOKEN

RUN yarn build

# Stage 3: run
FROM node:14.20.1-bullseye-slim
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy entrypoint script
COPY ./docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]