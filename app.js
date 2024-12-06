// Verificar si las notificaciones están disponibles en el navegador
if ('Notification' in window) {
    // Verificar si el permiso ya está concedido
    if (Notification.permission === "default") {
        // Solicitar permiso al usuario para enviar notificaciones
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
