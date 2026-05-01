# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

# Stage 2: Runtime
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Set environment to production
ENV NODE_ENV production

EXPOSE 5000

CMD ["node", "server.js"]
