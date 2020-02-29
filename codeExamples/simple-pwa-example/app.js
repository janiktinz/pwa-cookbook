/* Based on https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/ (access: 14.01.2019) */

// register service worker 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log(reg))
            .catch(err => console.log(err));
}