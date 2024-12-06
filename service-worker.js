// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('app-cache').then((cache) => {
            return cache.addAll([
                '', // Asegúrate de agregar el ícono si lo necesitas
                'index.html',
                'styles.css',
                'app.js',
                'manifest.json',
                'icon.png', // Íconos para las notificaciones (si tienes)
                'badge.png' // Insignia de la notificación
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
        icon: '/icon.png', // Ruta al ícono de la notificación
        badge: '/badge.png', // Ruta a la insignia
    };

    // Mostrar la notificación cuando se recibe un push
    event.waitUntil(
        self.registration.showNotification('Notificación de datos', options)
    );
});

// Manejo de la acción de hacer clic en la notificación
self.addEventListener('notificationclick', (event) => {
    console.log('Notificación clickeada:', event.notification);
    event.notification.close(); // Cerrar la notificación cuando se hace clic

    // Aquí puedes agregar la lógica para redirigir al usuario si lo deseas
    event.waitUntil(
        clients.openWindow('/') // Redirige al usuario a la página principal
    );
});
