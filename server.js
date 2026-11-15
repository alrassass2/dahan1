/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Production Server for معلم دهانات وترميم جدة (Node.js ES Module)
 */

import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

const PORT = Number(process.env.PORT) || 3000;
const distPath = path.join(__dirname, 'dist');

const CSP_POLICY = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://server.arcgisonline.com https://blogger.googleusercontent.com https://maps.gstatic.com https://*.googleapis.com; frame-src 'self' https://www.google.com https://maps.google.com; connect-src 'self' https://server.arcgisonline.com; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me";

app.use(express.json({ limit: '100kb' }));

// Security & Transport Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Content-Security-Policy', CSP_POLICY);

  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
});

const PRIMARY_SITE_ORIGIN = 'https://www.1-sa.shop';

function getRequestOrigin(req) {
  const configured = process.env.APP_URL;
  if (configured && /^https?:\/\//i.test(configured) && !configured.includes('MY_APP_URL')) {
    return configured.replace(/\/+$/, '');
  }
  const host = req.headers['x-forwarded-host'] || req.get('host') || '';
  if (!host || host.includes('1-sa.shop')) {
    return PRIMARY_SITE_ORIGIN;
  }
  const protoHeader = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const proto = String(protoHeader).split(',')[0].trim();
  return `${proto}://${host}`;
}

function hydrateIndexHtml(html, _origin) {
  return html;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'معلم دهانات وترميم جدة',
    domain: PRIMARY_SITE_ORIGIN,
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// App metadata endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'معلم دهانات وترميم جدة',
    brand: 'Jeddah Painter & Renovation Master',
    description: 'دهانات وديكورات وتشطيبات وترميم وصيانة المنازل.',
    phone: '0507478126',
    whatsapp: '+966507478126',
    city: 'جدة – المملكة العربية السعودية',
    domain: PRIMARY_SITE_ORIGIN,
    version: '3.0.0'
  });
});

// Explicit Google Search Console HTML Verification Route
app.get('/googlec58ca4a5eeef581e.html', (_req, res) => {
  res.type('text/html; charset=utf-8').send('google-site-verification: googlec58ca4a5eeef581e.html');
});

// Dynamic robots.txt with https://www.1-sa.shop/sitemap.xml
app.get('/robots.txt', (req, res) => {
  const origin = req.get('host')?.includes('1-sa.shop') ? PRIMARY_SITE_ORIGIN : getRequestOrigin(req);
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
});

// Dynamic Google Image Sitemap qualified for 1-sa.shop
app.get('/sitemap.xml', (req, res) => {
  const origin = PRIMARY_SITE_ORIGIN;
  const candidates = [
    path.join(distPath, 'sitemap.xml'),
    path.join(__dirname, 'public', 'sitemap.xml'),
  ];
  const xmlPath = candidates.find((p) => fs.existsSync(p));
  if (!xmlPath) {
    res.status(404).end();
    return;
  }
  const rawXml = fs.readFileSync(xmlPath, 'utf8');
  const hydratedXml = rawXml
    .replace(/<loc>(\/[^<]*)<\/loc>/g, `<loc>${origin}$1</loc>`)
    .replace(/<image:loc>(\/[^<]+)<\/image:loc>/g, `<image:loc>${origin}$1</image:loc>`);
  res.type('application/xml').send(hydratedXml);
});

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    index: false,
    maxAge: '1y',
    etag: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  app.get('*', (req, res) => {
    const indexFile = path.join(distPath, 'index.html');
    if (fs.existsSync(indexFile)) {
      const origin = getRequestOrigin(req);
      const html = fs.readFileSync(indexFile, 'utf8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.type('html').send(hydrateIndexHtml(html, origin));
      return;
    }
    res.sendFile(indexFile);
  });
} else {
  app.get('*', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="utf-8">
          <title>معلم دهانات وترميم جدة</title>
          <style>
            body { font-family: system-ui, sans-serif; text-align: center; padding: 50px; background: #0f2b5c; color: white; }
            h1 { color: #f59e0b; }
            p { font-size: 1.1rem; color: #cbd5e1; }
          </style>
        </head>
        <body>
          <h1>معلم دهانات وترميم جدة</h1>
          <p>يرجى تشغيل بناء ملفات الموقع عبر: <code>npm run build</code></p>
          <p>جدة – المملكة العربية السعودية • للتواصل: 0507478126</p>
        </body>
      </html>
    `);
  });
}

const sslKeyPath = process.env.SSL_KEY_PATH || path.join(__dirname, 'ssl', 'privkey.pem');
const sslCertPath = process.env.SSL_CERT_PATH || path.join(__dirname, 'ssl', 'fullchain.pem');

if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  const tlsOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
    minVersion: 'TLSv1.2',
  };
  https.createServer(tlsOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`HTTPS TLS server running on port ${PORT} for Jeddah Painter & Renovation Master`);
  });
} else {
  http.createServer(app).listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} for Jeddah Painter & Renovation Master`);
  });
}
