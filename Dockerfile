# Stage 1: Image to build app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Image to testing app
FROM node:20 AS testing
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run test

# Stage 3: Image to prod
FROM nginx:1.28.0 AS prod

COPY --from=builder /app/dist/ecommerce-app/browser /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]