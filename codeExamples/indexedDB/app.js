/* Based on https://github.com/pwapraxis/beispiele/blob/master/kapitel05/index.html (access: 14.01.2019) */

myDB.open()
        .then(() => {
            if ('serviceWorker' in navigator) {
                return navigator.serviceWorker.register('sw.js');
            }
        }).then(reg => console.log(reg))
        .catch(err => console.error(err));

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', event => console.log('sw:', event.data));

        // communication between service worker and web application via postMessage()
        navigator.serviceWorker.ready.then(registration => registration.active.postMessage('the answer to life, the universe and everything'));
    }