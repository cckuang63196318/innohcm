const cacheVersion = "v2.06";
const filesToCache = [

];

self.addEventListener("install", event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheVersion).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys()
    .then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheVersion) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener("fetch", event => {  
  event.respondWith(
    caches
      .open(cacheVersion)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        console.log('[ServiceWorker] fetch', event.request);
        return response || fetch(event.request);
      }),
  );
});
