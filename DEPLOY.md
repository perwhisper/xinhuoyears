# 薪火年度报告部署指南

本项目配置了 Docker 支持，可以轻松部署到任何支持 Docker 的服务器上。

## 部署准备

1. **服务器**: 确保服务器已安装 `docker` 和 `docker-compose`。
2. **域名**: 确保 `wangfuguo.xyz` 的 DNS A 记录已指向您的服务器 IP 地址。

## 快速部署步骤

### 1. 登录服务器
使用 SSH 登录到您的服务器：
```bash
ssh root@<您的服务器IP>
```

### 2. 克隆代码仓库
```bash
# 如果是首次部署
git clone git@github.com:perwhisper/xinhuoyears.git
cd xinhuoyears
# 注意：如果您的项目代码在子目录（如 xinhuo11），请进入该子目录
cd xinhuo11
```

### 3. 启动服务
使用 Docker Compose 一键构建并启动服务：
```bash
docker-compose up -d --build
```

### 4. 验证部署
在浏览器访问 [http://wangfuguo.xyz](http://wangfuguo.xyz)。

## 常用维护命令

- **查看日志**:
  ```bash
  docker-compose logs -f
  ```

- **停止服务**:
  ```bash
  docker-compose down
  ```

- **更新代码并重新部署**:
  ```bash
  git pull
  docker-compose up -d --build
  ```

## 目录结构说明
- `Dockerfile`: 定义了构建 React 应用和 Nginx 镜像的步骤。
- `nginx.conf`: Nginx 配置文件，处理路由重定向（解决刷新 404 问题）和静态资源缓存。
- `docker-compose.yml`: 定义了服务运行配置。
