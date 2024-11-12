# Stage 1: Build the Angular application
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM node:20 as runtime
WORKDIR /app
COPY --from=build /app/dist/wishlist/browser /app
RUN npm install -g serve
CMD ["serve", "-s", "/app", "-l", "80"]
