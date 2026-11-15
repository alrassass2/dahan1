import JSZip from 'jszip';

export async function generateProjectZipBundle(): Promise<Blob> {
  const zip = new JSZip();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'jeddah-painter-renovation',
        version: '3.0.0',
        private: true,
        type: 'module',
        description: 'معلم دهانات وترميم جدة - دهانات وديكورات وتشطيبات وترميم وصيانة المنازل',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
          start: 'node server.js'
        }
      },
      null,
      2
    )
  );

  zip.file(
    'README-ENV.txt',
    `هذا التطبيق جاهز للعمل مباشرة على نطاق https://www.1-sa.shop بدون أي متغيرات بيئة مطلوبة.\n`
  );

  zip.file(
    'server.js',
    `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

const CSP_POLICY = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://server.arcgisonline.com https://blogger.googleusercontent.com https://maps.gstatic.com https://*.googleapis.com; frame-src 'self' https://www.google.com https://maps.google.com; connect-src 'self' https://server.arcgisonline.com; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me";

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Content-Security-Policy', CSP_POLICY);
  next();
});

app.use(express.json({ limit: '100kb' }));
app.use(express.static(distPath, { maxAge: '1y', etag: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'معلم دهانات وترميم جدة',
    timestamp: new Date().toISOString()
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on port \${PORT}\`);
});
`
  );

  zip.file(
    'vercel.json',
    JSON.stringify(
      {
        version: 2,
        name: 'jeddah-painter-renovation',
        cleanUrls: true,
        trailingSlash: false,
        rewrites: [{ source: '/((?!googlec58ca4a5eeef581e\\.html|sitemap\\.xml|robots\\.txt|assets/|images/|favicon\\.png|logo\\.png|og-image\\.jpg).*)', destination: '/index.html' }],
        headers: [
          {
            source: '/(.*)',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
              { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' }
            ]
          }
        ]
      },
      null,
      2
    )
  );

  zip.file(
    'metadata.json',
    JSON.stringify(
      {
        name: 'معلم دهانات وترميم جدة',
        description:
          'معلم دهانات وترميم جدة، متخصصون في الدهانات الداخلية والخارجية والديكورات الحديثة وترميم وصيانة المنازل والفلل والشقق، للتواصل 0507478126.',
        requestFramePermissions: [],
        majorCapabilities: []
      },
      null,
      2
    )
  );

  if (origin) {
    zip.file(
      'public/robots.txt',
      `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
    );
  }

  return await zip.generateAsync({ type: 'blob' });
}
