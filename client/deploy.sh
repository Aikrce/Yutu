#!/bin/bash

# GitHub Pages 部署脚本

echo "🚀 开始部署到 GitHub Pages..."

# 进入项目目录
cd "$(dirname "$0")"

# 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败！"
  exit 1
fi

echo "✅ 构建成功！"

# 创建临时部署目录
DEPLOY_DIR=$(mktemp -d)
echo "📁 创建临时部署目录: $DEPLOY_DIR"

# 复制构建产物
cp -r dist/* "$DEPLOY_DIR/"

# 创建 404.html 用于支持 SPA 路由
cp dist/index.html "$DEPLOY_DIR/404.html"

# 进入部署目录
cd "$DEPLOY_DIR"

# 初始化 git 并推送
git init
git config user.name "GitHub Actions"
git config user.email "github-actions@github.com"
git add .
git commit -m "🚀 部署到 GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 gh-pages 分支
echo "📤 推送到 gh-pages 分支..."
git push -f git@github.com:Aikrce/Yutu.git main:gh-pages

# 清理临时目录
cd ..
rm -rf "$DEPLOY_DIR"

echo "✅ 部署完成！"
echo "🌐 访问地址: https://aikrce.github.io/Yutu/"
echo ""
echo "⚠️  注意："
echo "1. 首次部署需要在 GitHub 仓库设置中启用 GitHub Pages"
echo "2. 前往 https://github.com/Aikrce/Yutu/settings/pages"
echo "3. Source 选择 'Deploy from a branch'"
echo "4. Branch 选择 'gh-pages'，文件夹选择 '/ (root)'"
echo "5. 保存后等待几分钟即可访问"
