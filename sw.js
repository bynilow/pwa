const cacheName = '1';

const assetsUrls = [
    './src/index.html',
    './src/index.css'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(assetsUrls))
    )
})

self.addEventListener('activate', event => {

})