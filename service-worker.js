self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                '',
                'index.html',
                'styles.css',
                'app.js',
                'manifest.json'
            ]);
        })
    );
    console.log('Service Worker instalado');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
