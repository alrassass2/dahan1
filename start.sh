#!/bin/bash
# =========================================================================
# سكربت تشغيل ونشر موقع لمسات جدة للدهانات والديكورات
# Domain: https://www.1-sa.shop
# =========================================================================

set -e

echo "=========================================================="
echo "🚀 بدء تشغيل موقع لمسات جدة للدهانات والديكورات (1-sa.shop)"
echo "=========================================================="

# 1. التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت على الخادم! يرجى تثبيت الإصدار 20 أو 22."
    exit 1
fi

echo "📦 1. فحص وتثبيت الاعتماديات..."
npm install --production=false

echo "🔨 2. بناء ملفات الموقع التوزيعية للإنتاج (Vite Build)..."
npm run build

echo "🔒 3. التأكد من ملفات الحماية والتهيئة (.htaccess, robots.txt, sitemap.xml)..."
cp -f public/.htaccess dist/ || true
cp -f public/robots.txt dist/ || true
cp -f public/sitemap.xml dist/ || true

echo "🌐 4. تشغيل خادم الإنتاج Node.js..."
node server.js
