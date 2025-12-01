FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Production stage
FROM builder AS production
WORKDIR /app/prod
COPY --from=builder /app/dist ./
ENV NODE_ENV=production
CMD ["node", "server.js"]