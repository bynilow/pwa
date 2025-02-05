const staticCacheName = 's-2';
const dynamicCacheName = 'd-2';

const assetsUrls = [
    './src/index.html',
    './src/index.css'
]

self.addEventListener('install', async (event) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetsUrls);
})

self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => caches.delete(name))
    )
})

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(event.request));
    } else {
        event.respondWith(networkFirst(event.request));
    }

})


const cacheFirst = async (request) => {
    const cached = await caches.match(request);
    return cached ?? await fetch(request)
}

const networkFirst = async (request) => {
    const cache = await caches.open(dynamicCacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response
    } catch (error) {
        const cached = await caches.match(request);
        return cached ?? 'offline'
    }
}