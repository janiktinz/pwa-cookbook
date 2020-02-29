// method open() 
document.querySelector('#open_cache').addEventListener('click', () => {
    self.caches.open('cacheAPI-files-v1').then(cache => console.log(cache));
    alert("opened cacheAPI-files-v1");
});

// method keys()
document.querySelector('#list_caches').addEventListener('click', () => {
    self.caches.keys().then(caches => console.log(caches) + alert("Caches: " + caches));
});

// method delete() - cache
document.querySelector('#clear_cache').addEventListener('click', () => {
    self.caches.delete('cacheAPI-files-v1').then(success => console.log(success));
    alert("removed cacheAPI-files-v1!");
});

// method delete() - cache entry
document.querySelector('#remove_file_cache').addEventListener('click', () => {
    self.caches.open('cacheAPI-files-v1').then(cache => cache.delete('pwa.jpg'));
    alert("removed pwa.jpg");
});

// method add()
document.querySelector('#add_to_cache').addEventListener('click', () => {
    self.caches.open('cacheAPI-files-v1').then(cache => cache.add('pwa.jpg'));
    alert("added pwa.jpg to cacheAPI-files-v1");
});