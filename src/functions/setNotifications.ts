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

    getRegistration();
}

export const getRegistration = async () => {
    const registation = await navigator.serviceWorker.getRegistration();
    console.log(registation)
    const subscribe = await registation?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: null,
    });
    console.log(subscribe);
}

export const sendNotification = async (title: string, bodyText?: string) => {
    try {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, { body: bodyText });
    } catch (error) {
        console.log(error);
    }
}