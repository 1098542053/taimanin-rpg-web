# Taimanin RPGX Web

Taimanin RPGX 查看器的 Web 部署版，基于 Express + Docker。

## 项目结构

```
taimanin-rpg-web/
├── server.js              ← Express 静态服务器
├── package.json
├── Dockerfile             ← Docker 镜像构建
├── docker-compose.yml     ← 容器编排（资源卷挂载）
├── public/                ← 前端目录
│   ├── index.html         ← 入口页面
│   └── data/              ← 资源目录（挂载注入，不入镜像）
└── .github/workflows/     ← CI/CD 自动构建镜像
```

## 本地运行

```bash
npm install
npm start
# 打开 http://localhost:3000
```

## Docker 部署（Linux）

```bash
# 1. 拉取镜像
docker pull ghcr.io/1098542053/taimanin-rpg-web:latest

# 2. 放置资源：将 Taimanin RPGX 整个目录放到宿主机
#    如 /vol2/1000/项目/taimanin-rpg/Taimanin RPGX
#    包含 index.html、data/、scenes/、Story/ 等

# 3. 修改 docker-compose.yml 中的卷挂载路径后启动
docker compose up -d
```

访问 http://<NAS-IP>:3002 即可。
