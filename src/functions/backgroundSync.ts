import { CHECK_UPDATE_SYNC_ID } from "../const/const";

export const createBackgroundSyncPermission = async () => {
    const canPeriodicSync =
        'serviceWorker' in navigator &&
        'PeriodicSyncManager' in window;

    if (!canPeriodicSync) {
        throw new Error('Periodic Background Sync is not supported')
    }

    const registration = await navigator.serviceWorker.ready;
    const status = await navigator.permissions.query({
        ///@ts-ignore
        name: 'periodic-background-sync',
    });
    if (status.state !== 'granted') {
        console.log('Periodic Background Sync is not granted.');
        throw new Error('Background Sync is not granted')
    }
    try {
        ///@ts-ignore
        await registration.periodicSync.register(CHECK_UPDATE_SYNC_ID, {
            minInterval: 1000 * 60, /// every 1 min
        });

    } catch (error) {
        console.error('Periodic Background Sync registration failed', error);
    }
}