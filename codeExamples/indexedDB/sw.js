/* Based on https://github.com/pwapraxis/beispiele/blob/master/kapitel05/sw.js (access: 14.01.2019) */

importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.4/dexie.min.js', 'db.js');

self.addEventListener('install', () => {
    console.log('Installing');
});

self.addEventListener('activate', event => {
    event.waitUntil(myDB.open());
});

self.addEventListener('fetch', event => {
    console.log('fetch', event.request);
    if (event.request.url.endsWith('/students')) {
        event.respondWith(myDB.student.toArray().then(student => new Response(JSON.stringify(student))));
    }
});

// communication between service worker and web application via postMessage()
self.addEventListener('message', event => {
    console.log('app:', event.data);
    if (event.data === 'the answer to life, the universe and everything') {
        event.source.postMessage('42');
    }
});