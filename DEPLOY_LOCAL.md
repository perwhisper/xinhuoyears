# 薪火年度报告 - 本地构建部署指南

如果你希望**在本地电脑打包**，然后直接把打包好的文件上传到服务器，请按照以下步骤操作。

## 1. 本地打包
在你的电脑上运行：
```bash
npm run build
```
这会生成一个 `dist` 文件夹，里面包含了网站的所有静态文件。

## 2. 上传到服务器 (使用 Git)
为了方便，我们已经修改了配置，允许将 `dist` 文件夹提交到 Git。

```bash
# 1. 提交所有更改（包括 dist 文件夹）
git add .
git commit -m "Build and deploy: update dist files"

# 2. 推送到 GitHub
git push origin main  # 或者 git push origin master
```

## 3. 服务器部署
登录你的服务器，拉取最新代码并重启服务。

```bash
# 1. 进入项目目录
cd xinhuoyears/xinhuo11

# 2. 拉取最新代码（包含你本地打包好的 dist）
git pull

# 3. 重启 Docker 容器
# Docker 会直接使用你上传的 dist 文件夹，不再需要服务器进行 npm install
docker-compose up -d --build
```

---
## 备选方案：使用 SCP 直接上传 (不走 Git)
如果你不想把 `dist` 放到 Git 仓库里，可以使用 SCP 命令直接上传：

```bash
# 在本地电脑执行
scp -r ./dist root@<服务器IP>:/path/to/xinhuoyears/xinhuo11/
```
然后去服务器重启 Docker 即可。
