# MindWave JA — Next.js
# Stage 1: build
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: production
FROM node:22-alpine
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production
ENV PORT=3001
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/next.config.js ./
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3001
CMD ["pnpm", "start"]
