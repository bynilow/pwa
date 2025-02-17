import { sendNotification } from "./setNotifications";

export const requestBackgroundSyncPermission = async () => {
    ///@ts-ignore
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state === 'granted') {
        getSync();
    } else {
        throw new Error('Permission dont granted');
    }
}

export const getSync = async () => {
    const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
    if (registration) {
        ///@ts-ignore
        registration.sync.register('check-update');
    }
}