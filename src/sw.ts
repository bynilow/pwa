import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { BTC_API, CHECK_UPDATE_SYNC_ID, POSTS_API, VERSION } from './const/const';
import { sendNotification } from './functions/setNotifications';
import { createCheckUpdate } from './functions/backgroundSync';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', () => {
    localStorage.version = JSON.stringify(VERSION);
    console.log(VERSION);
    createCheckUpdate();
})

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', event => {
    console.log('push event: ')
    console.log(event)
    const title = event.data?.text();
    event.waitUntil(
        self.registration.showNotification(title || 'null notification text')
    )
});

self.addEventListener('periodicsync', event => {
    //@ts-ignore
    if (event.tag === CHECK_UPDATE_SYNC_ID) {
        console.log(localStorage.version)
        //@ts-ignore
        event.waitUntil(
            sendNotification('Got new update!', `Return to app for update to v${VERSION}.`)
        )
    }
})

const DYNAMIC_CACHE_NAME = 'dynamic';
const IMAGES_CACHE_NAME = 'images';

///кэш изображений из папки images
registerRoute(
    ({ request }) => request.destination === 'image' && '/\.png/',
    new StaleWhileRevalidate({
        cacheName: IMAGES_CACHE_NAME,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            new ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

const URLS_TO_CACHE = [
    BTC_API,
    POSTS_API
]

///кэш динамики
registerRoute(
    ({ url }) => URLS_TO_CACHE.includes(url.href),
    new StaleWhileRevalidate({
        cacheName: DYNAMIC_CACHE_NAME,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            }),
            new ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ]
    })
);

// registerRoute(
//     ({ request }) => console.log(request)
// );

