# 纯静态部署模式
# 这种模式下，我们假设你已经在本地执行了 `npm run build`
# 并且生成的 `dist` 文件夹已经位于当前目录

FROM nginx:alpine

# 复制本地构建好的 dist 目录到 Nginx 容器
COPY dist /usr/share/nginx/html

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
