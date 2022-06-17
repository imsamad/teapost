# ############## 1.) install packages ################ #
FROM node:16-alpine as packages
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ############## 2.) build app ################ #
FROM node:16-alpine as builder
WORKDIR /app
COPY . .
COPY --from=packages /app/node_modules ./node_modules
RUN npm run build

# ############## 3.) run/start app ################ #
FROM node:16-alpine as runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/.env ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json /app/package-lock.json ./

CMD npm start