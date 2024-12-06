// Manejo de notificaciones
if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then((result) => {
        console.log('Permiso de notificación:', result);
    });
}

// Registro de datos y notificación
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('data-input');
    const value = input.value.trim();

    if (value) {
        const list = document.getElementById('data-list');
        const listItem = document.createElement('li');
        listItem.textContent = value;
        list.appendChild(listItem);

        // Notificación
        if (Notification.permission === 'granted') {
            new Notification('Nuevo dato registrado', {
                body: value,
            });
        }

        input.value = '';
    }
});

// Manejo de instalación de PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButton = document.createElement('button');
    installButton.textContent = 'Instalar App';
    installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    document.body.appendChild(installButton);

    installButton.addEventListener('click', () => {
        installButton.remove();
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
            console.log('Instalación:', choice.outcome);
            deferredPrompt = null;
        });
    });
});
