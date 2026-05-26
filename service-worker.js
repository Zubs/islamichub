const CACHE_NAME = 'islamichub-shell-v2';
const APP_SHELL = [
    '/',
    '/index.html',
    '/pages/arafah.html',
    '/css/tokens.css',
    '/css/base.css',
    '/css/components.css',
    '/css/ornament.css',
    '/css/arafah.css',
    '/js/app.js',
    '/js/router.js',
    '/js/seo.js',
    '/js/arafah.js',
    '/js/arafah-geolocation.js',
    '/js/arafah-prayer.js',
    '/js/arafah-dua.js',
    '/js/arafah-timetable.js',
    '/js/arafah-calendar.js',
    '/favicon.svg',
    '/site.webmanifest',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            await Promise.allSettled(
                APP_SHELL.map(async asset => {
                    const response = await fetch(asset, { cache: 'no-cache' });
                    if (response.ok) {
                        await cache.put(asset, response);
                    }
                })
            );
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith((async () => {
        const cached = await caches.match(event.request, { ignoreSearch: true });
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(event.request);
            const requestUrl = new URL(event.request.url);
            const shouldCache = response.ok || requestUrl.origin !== self.location.origin;
            if (shouldCache) {
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
            }
            return response;
        } catch (error) {
            const fallback = await caches.match('/pages/arafah.html');
            if (fallback && event.request.mode === 'navigate') {
                return fallback;
            }
            throw error;
        }
    })());
});
