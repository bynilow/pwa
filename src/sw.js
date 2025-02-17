self.__WB_MANIFEST;

import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

const imageCacheName = 'i-1';
const dynamicCacheName = 'd-2';
const staticCacheName = 's-1';

///кэш изображения
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: imageCacheName,
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

///кэш статики
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: imageCacheName,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

///кэш динамика
registerRoute(
    ({ request }) => request.url,
    new NetworkFirst({
        cacheName: dynamicCacheName,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 d
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            })
        ]
    })
);

registerRoute(
    (request) => console.log(request)
);