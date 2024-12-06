// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                'index.html',
                'styles.css',
                'app.js',
                'manifest.json',
                'monarca.png', // Íconos para las notificaciones (si tienes)
                'monarca (1).png' // Insignia de la notificación
            ]);
        })
    );
    console.log('Service Worker instalado');
});

// Manejo de las solicitudes fetch y caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Manejo de notificaciones push
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: 'monarca.png', // Ruta al ícono de la notificación
        badge: 'monarca (1).png', // Ruta a la insignia
    };

    // Mostrar la notificación cuando se recibe un push
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
