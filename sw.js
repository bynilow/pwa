const cacheName = '3';

const assetsUrls = [
    './src/index.html',
    './src/index.css'
]

self.addEventListener('install', async (event) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(assetsUrls);
})

self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter(name => name !== cacheName)
            .map(name => caches.delete(name))
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
})


const cacheFirst = async (request) => {
    const cached = await caches.match(request);
    return cached ?? await fetch(request)
}