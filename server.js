/**
 * taimanin-rpg-web 后端服务器
 * 纯静态文件服务：托管 Taimanin RPGX 查看器资源（index.html + data/ + 场景目录）
 *
 * 本地开发：
 *   默认静态根 = public/Taimanin RPGX（整个资源包自包含）
 *   npm install && npm start  →  http://localhost:3000
 *
 * Docker 部署：
 *   将 NAS 上的资源目录挂载到容器 /app/site，并通过 PUBLIC_DIR 指定
 *   PUBLIC_DIR=/app/site node server.js
 *
 * 环境变量：
 *   PORT        监听端口（默认 3000）
 *   PUBLIC_DIR  静态资源根目录（默认 public/Taimanin RPGX）
 */

'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3000;

// 静态资源根：默认指向 public/Taimanin RPGX（整个资源包）
const DEFAULT_PUBLIC_DIR = path.join(__dirname, 'public', 'Taimanin RPGX');
const PUBLIC_DIR = process.env.PUBLIC_DIR || DEFAULT_PUBLIC_DIR;

// 检查资源目录是否存在，启动时给出明确提示
if (!fs.existsSync(PUBLIC_DIR)) {
  console.error('[ERROR] Public dir not found: ' + PUBLIC_DIR);
  console.error('Place the Taimanin RPGX resource package under public/ or set PUBLIC_DIR.');
}

// 允许访问隐藏文件（部分资源以点号开头）
app.use(express.static(PUBLIC_DIR, { dotfiles: 'allow', index: 'index.html' }));

// 兜底：所有未匹配路径回退到 index.html（查看器为单页应用）
app.get('*', function (req, res) {
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found in ' + PUBLIC_DIR);
  }
});

app.listen(PORT, function () {
  console.log('Taimanin RPGX Web server listening on port ' + PORT);
  console.log('Public dir: ' + PUBLIC_DIR);
});
