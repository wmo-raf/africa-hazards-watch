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
RUN yarn install

# Stage 2: build
FROM node:14.20.1-bullseye-slim AS builder
RUN apt-get update && apt-get install -y libgl1 libxi6
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY public ./public
COPY package.json next.config.js jsconfig.json ./
RUN yarn build

# Stage 3: run
FROM node:14.20.1-bullseye-slim
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["yarn", "start"]