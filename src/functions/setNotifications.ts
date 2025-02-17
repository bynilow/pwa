export const requestNotificationPermission = async () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker not supported');
    }

    if (!('Notification' in window)) {
        throw new Error('Notification API not supported');
    }

    const permission = await Notification.requestPermission();
    if (!permission) {
        throw new Error('Notification permission not granted');
    }

    // getRegistration();
}

// export const getRegistration = async () => {
//     const registation = await navigator.serviceWorker.getRegistration();
//     console.log(registation)
//     const subscribe = registation?.pushManager.subscribe({
//         userVisibleOnly: true
//     });
//     console.log(subscribe);
// }