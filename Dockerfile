FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage
FROM builder as development
ENV NODE_ENV=development
EXPOSE 7313
CMD ["npm", "run", "dev"]

# Production stage
FROM builder as production
ENV NODE_ENV=production
CMD ["npm", "start"]