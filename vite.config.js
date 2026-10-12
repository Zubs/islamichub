import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const DAY_SECONDS = 24 * 60 * 60

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      filename: 'service-worker.js',
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'IslamicHub',
        short_name: 'IslamicHub',
        description:
          'Prayer times, Qibla, adhkar, tasbih, Zakat and guides to the Five Pillars. Works offline.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#f7f3ec',
        theme_color: '#1b5c42',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          { name: 'Prayer times', url: '/prayer', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
          { name: 'Adhkar', url: '/adhkar', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
          { name: 'Tasbih', url: '/tasbih', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        globIgnores: ['sw-legacy.js'],
        importScripts: ['/sw-legacy.js'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /\.[a-z0-9]+$/i],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'islamichub-fonts',
              expiration: { maxEntries: 40, maxAgeSeconds: 365 * DAY_SECONDS },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/hadith/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'islamichub-hadith',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 300, maxAgeSeconds: 90 * DAY_SECONDS },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js', 'test/**/*.test.js'],
    globalSetup: './test/global-setup.js',
    setupFiles: ['./test/setup.js'],
    alias: {
      'virtual:pwa-register': fileURLToPath(new URL('./test/pwa-register.stub.js', import.meta.url)),
    },
  },
})
