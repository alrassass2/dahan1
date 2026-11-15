// Suppress native loader warning in Vite
process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING = 'true';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, type Plugin} from 'vite';

const projectRoot = typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : path.resolve('.');

const servePublicStaticFilesPlugin = (): Plugin => ({
  name: 'serve-public-static-files',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const reqPath = (req.url || '').split('?')[0];
      if (reqPath === '/googlec58ca4a5eeef581e.html') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('google-site-verification: googlec58ca4a5eeef581e.html');
        return;
      }
      if (!reqPath.endsWith('.zip')) return next();
      const safeRel = path.normalize(reqPath).replace(/^(\.\.(\/|\\|$))+/, '');
      const fullPath = path.join(projectRoot, 'public', safeRel);
      if (fullPath.startsWith(path.join(projectRoot, 'public')) && fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(fullPath)}"`);
        res.setHeader('Cache-Control', 'no-store');
        fs.createReadStream(fullPath).pipe(res);
        return;
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [servePublicStaticFilesPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    define: {
      'process.env.VITE_CONFIG_NATIVE_IGNORE_WARNING': JSON.stringify('true'),
    },
  };
});
