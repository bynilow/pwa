import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { BTC_API, POSTS_API } from './const/const';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();

const POSTS_CACHE_NAME = 'posts';
const IMAGES_CACHE_NAME = 'images';
const BTC_CACHE_NAME = 'btc';

///кэш изображений из папки images
registerRoute(
    '/images/',
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

///кэш цены
registerRoute(
    ({ url }) => url.href === BTC_API,
    new NetworkFirst({
        cacheName: BTC_CACHE_NAME,
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

///кэш постов
registerRoute(
    ({ url }) => url.href === POSTS_API,
    new NetworkFirst({
        cacheName: POSTS_CACHE_NAME,
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

registerRoute(
    ({ request }) => console.log(request)
);

