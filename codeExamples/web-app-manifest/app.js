/* Based on https://github.com/pwapraxis/beispiele/blob/master/kapitel04/index.html (access: 14.01.2019) */

// javascript button for add to homescreen
const installButton = document.getElementById('install');
let deferredPrompt;

// prompt install banner
window.addEventListener('beforeinstallprompt', evt => {
    event.preventDefault();
    deferredPrompt = evt;
    installButton.style.display = 'block';
});

// wait for click event
installButton.addEventListener('click', async () => {
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log(choiceResult.outcome);
});

// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log(reg))
            .catch(err => console.log(err));
}