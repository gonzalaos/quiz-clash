FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS deploy
WORKDIR /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY run.sh /
COPY --from=build /app/dist/ .
CMD ["sh", "/run.sh"]