FROM node:24-alpine AS base
WORKDIR /workspace
RUN corepack enable

FROM base AS deps
COPY next-app/package.json next-app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
COPY next-app/ ./
RUN pnpm build

FROM node:24-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/.next/standalone ./
COPY --from=builder /workspace/.next/static ./.next/static
COPY --from=builder /workspace/config ./config
EXPOSE 3000
CMD ["node", "server.js"]

# Admin / Ops image (shell + full source for scripts)
FROM base AS admin
WORKDIR /app

RUN apk add --no-cache bash

COPY . .
COPY --from=deps /workspace/node_modules ./next-app/node_modules

WORKDIR /app/next-app

CMD ["/bin/bash"]
