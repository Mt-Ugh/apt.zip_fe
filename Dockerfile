# Vue 앱 빌드 단계
FROM node:20-alpine AS build
WORKDIR /app
COPY . .

# npm install → vite 재설치 → 빌드
RUN npm install \
 && npm rebuild vite \
 && npm run build

# Nginx 정적 서빙
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
