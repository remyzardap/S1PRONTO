# ─── Sutaeru S1PRONTO — Production Dockerfile ───
# Optimized for Coolify deployment

FROM node:20-alpine

# Install curl for healthchecks
RUN apk add --no-cache curl

WORKDIR /app

# Force development mode during build so all deps install
ENV NODE_ENV=development

# Install ALL dependencies (including devDependencies for build tools)
COPY package.json ./
RUN npm install

# Copy full source
COPY . .

# Build: Vite frontend + esbuild server bundle
RUN npm run build

# Switch to production for runtime
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=5 \
  CMD curl -f http://localhost:3000/ || exit 1

EXPOSE 3000

# Run migrations then start server
CMD ["sh", "-c", "node --import tsx/esm server/migrate.ts && node dist/index.js"]
