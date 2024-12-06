// Verificar si las notificaciones están soportadas en el navegador
if ('Notification' in window) {
    // Solicitar permiso para notificaciones
    if (Notification.permission === "default") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                console.log("Permiso para notificaciones concedido");
            } else {
                console.log("Permiso para notificaciones denegado");
            }
        });
    } else if (Notification.permission === "granted") {
        console.log("Ya tienes permiso para recibir notificaciones");
    } else {
        console.log("El permiso para notificaciones ha sido denegado previamente");
    }
}

// Registrando el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        }).catch((error) => {
            console.log('Error al registrar el Service Worker:', error);
        });
    });
}

// Manejo del formulario para registrar datos y notificaciones
const form = document.getElementById('data-form');
const input = document.getElementById('data-input');
const dataList = document.getElementById('data-list');

// Al hacer submit en el formulario, registrar el dato y mostrar una notificación
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const data = input.value.trim(); // Obtener el dato ingresado
    if (data) {
        // Registrar el dato
        const listItem = document.createElement('li');
        listItem.textContent = data;
        dataList.appendChild(listItem);

        // Enviar una notificación
        new Notification("¡Nuevo pendiente registrado!", {
            body: `Se ha registrado: ${data}`,
            icon: 'img/icon.png' // Asegúrate de tener este archivo de icono
        });

        // Limpiar el campo de entrada
        input.value = '';
    }
});

// Funcionalidad para el botón de instalación de la PWA
const installButton = document.getElementById('install-button');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevenir la ventana de instalación predeterminada
    deferredPrompt = event; // Guardar el evento de instalación
    installButton.style.display = 'block'; // Mostrar el botón de instalación
});

installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Mostrar el diálogo de instalación
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('La aplicación fue instalada');
            } else {
                console.log('La instalación fue rechazada');
            }
            deferredPrompt = null; // Limpiar el evento después de la interacción
        });
    }
});
