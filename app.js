// Verificar si las notificaciones están soportadas en el navegador
if ('Notification' in window) {
    // Solicitar permiso para enviar notificaciones si el permiso es "default"
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
} else {
    console.log("Este navegador no soporta notificaciones.");
}

// Registrando el Service Worker (si no está ya registrado)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        }).catch((error) => {
            console.log('Error al registrar el Service Worker:', error);
        });
    });
}

// Función para registrar datos y enviar notificación
document.getElementById('registerButton').addEventListener('click', function() {
    const dataInput = document.getElementById('dataInput').value;
    if (dataInput) {
        // Aquí agregarías el código para registrar el dato (puede ser en un array o base de datos)
        console.log("Dato registrado:", dataInput);

        // Mostrar una notificación
        new Notification("¡Nuevo dato registrado!", {
            body: `Se ha registrado: ${dataInput}`,
            icon: '/path/to/icon.png' // Opcional, puedes agregar un ícono
        });
        
        // Limpiar el campo de entrada
        document.getElementById('dataInput').value = '';
    } else {
        alert("Por favor, ingresa un dato.");
    }
});
