# =========================================================================
# Multi-stage Production Dockerfile for Lamasat Jeddah
# Domain: https://www.1-sa.shop
# =========================================================================

# Stage 1: Build Frontend Assets
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build static assets
COPY . .
RUN npm run build

# Stage 2: Minimal Production Runner
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/public ./public

# Expose production port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start Production Server
CMD ["node", "server.js"]
