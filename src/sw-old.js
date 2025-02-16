const staticCacheName = 's-6';
const dynamicCacheName = 'd-6';

const assetsUrls = [
    './src/index.html',
    './src/index.css',
    './public/images/cat.png'
]

self.addEventListener('install', async (event) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetsUrls);
})

self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys();
    console.log(cacheNames)
    // await Promise.all(
    //     cacheNames
    //         .filter(name => name !== staticCacheName)
    //         .filter(name => name !== dynamicCacheName)
    //         .map(name => caches.delete(name))
    // )
})

self.addEventListener('fetch', event => {
    const { request } = event;
    console.log(request)
    event.respondWith(cacheFirst(request));
})


const cacheFirst = async (request) => {
    const cached = await caches.match(request);
    console.log('cached value: ', cached)
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