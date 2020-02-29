/* Based on https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/ (access: 14.01.2019) */

var cacheName = 'cacheAPI-files-v1';

var filesToCache = [
    './', 
    './index.html', 
    './app.js', 
    './style.css'
];

// install the service worker
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        // open the cache
        caches.open(cacheName).then(function(cache) {
            // add files to the cache
            return cache.addAll(filesToCache);
        })
    );
});

// activate the service worker
self.addEventListener('activate', function(event) {
    /* e.g. open a database, delete the cache or do something else */  
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// catch the network query and answer from cache or network
self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});