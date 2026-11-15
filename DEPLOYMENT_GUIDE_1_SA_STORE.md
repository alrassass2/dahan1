# دليل تصدير ونشر موقع لمسات جدة للدهانات والديكورات (1-sa.shop)

مرحباً بك! هذه الحزمة البرمجية مهيأة ومجهزة بالكامل للرفع والنشر الفوري على أي استضافة خارجية، خادم سحابي (VPS)، أو منصة سحابية (Vercel / Netlify / Docker) دون الحاجة لأي تعديلات أو إضافات يدوية.

---

## 📋 معلومات المشروع والنطاق المعتمد:
- **اسم المؤسسة**: مؤسسة لمسات جدة للدهانات والديكورات
- **النطاق الرسمي**: `https://www.1-sa.shop`
- **الموقع الجغرافي**: جدة - حي الأجاويد، شارع سعيد بن ثابت الأنصاري
- **رقم التواصل والواتساب المعتمد**: `0507478126` (+966507478126)

---

## 🚀 خيارات النشر والربط بالاستضافة الخارجية:

### 1. الخيار الأول: الاستضافة المشتركة أو لوحة cPanel (الأسرع والأسهل)
1. قم بتشغيل أمر البناء التوزيعي:
   ```bash
   npm run build
   ```
2. سينتج مجلد باسم `dist`.
3. ارفع كافة محتويات مجلد `dist` إلى داخل مجلد `public_html` في لوحة cPanel (عبر مدير الملفات أو FTP).
4. تأكد من وجود ملف `.htaccess` المرفق داخل `public_html` لضمان:
   - تحويل الزوار تلقائياً إلى الرابط الآمن المشفر `https://`
   - توجيه الروابط الداخلية والصفحات لتعمل بسلاسة دون أخطاء 404
   - تفعيل كاش المتصفح وضغط Gzip لتسريع التصفح
5. قم بتفعيل شهادة الأمان المجانية **AutoSSL** أو **Let's Encrypt** من قسم SSL/TLS في cPanel لنطاق `1-sa.shop`.

---

### 2. الخيار الثاني: خادم VPS سحابي (Ubuntu / Debian / Nginx / Node.js)
1. ثبت بيئة Node.js (الإصدار 20 أو 22) وخادم Nginx:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx certbot python3-certbot-nginx
   ```
2. انسخ ملفات المشروع إلى المسار: `/var/www/lamasat-jeddah`
3. قم بتشغيل سكربت البداية التلقائي:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
4. للتشغيل الدائم بالخلفية باستخدام PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "lamasat-jeddah"
   pm2 startup
   pm2 save
   ```
5. انسخ ملف `nginx.conf` المرفق إلى إعدادات Nginx:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/1-sa.shop
   sudo ln -s /etc/nginx/sites-available/1-sa.shop /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
6. أصدر شهادة SSL مجانية بضغطة زر:
   ```bash
   sudo certbot --nginx -d 1-sa.shop -d www.1-sa.shop
   ```

---

### 3. الخيار الثالث: الحاويات ونشر Docker (Docker / Portainer / Cloud Run / Coolify)
1. تم تضمين ملَفَي `Dockerfile` و `docker-compose.yml`.
2. قم بتشغيل الحاوية فورياً بأمر:
   ```bash
   docker compose up -d --build
   ```
3. سيعمل التطبيق على المنفذ `3000` مع فحص صحي دوري تلقائي عبر `/api/health`.

---

### 4. الخيار الرابع: الاستضافة السحابية السريعة (Vercel / Netlify)
- **Vercel**: تم تضمين ملف `vercel.json` المجهز بروابط التوجيه وشهادات الأمان وترويسات الحماية. اربط المستودع فقط واضغط Deploy.
- **Netlify**: تم تضمين ملف `_redirects` الذي يضمن تشغيل تطبيق SPA بنسبة 100%.

---

## 🔒 شهادات الأمان وإعدادات الحماية المطبقة تلقائياً:
- **HSTS (Strict-Transport-Security)**: مفعل لمدة سنة كاملة مع تضمين النطاقات الفرعية.
- **X-Frame-Options: SAMEORIGIN**: لمنع هجمات Clickjacking وتضمين الموقع داخل أطر غير مصرحة.
- **X-Content-Type-Options: nosniff**: لحماية ملفات الوسائط والأسلوب من التلاعب.
- **X-XSS-Protection**: تفعيل فلتر الحماية المدمج بالمتصفحات.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **RFC 9116 security.txt**: مضاف في مسار `/.well-known/security.txt`.
