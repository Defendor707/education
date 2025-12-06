# Desktop app build Dockerfile (for CI/CD)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Final stage - just to have the build artifacts
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/dist ./dist

CMD ["echo", "Build completed"]

