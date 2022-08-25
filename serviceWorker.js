const cacheVersion = "v2.06";
const filesToCache = [
  '/innohcm/',
  './index.html',
  './manifest.json',
  './serviceWorker.js',
  './innolux-offical.png',
  './personIcon.png',
  './favicon.ico',
  './favicon72.png',
  './favicon96.png',
  './favicon144.png',
  './favicon192.png',
  './favicon512.png',
  './certificate/CUXSG在職logo.jpg',
  './certificate/CUXSG簽名檔.jpg',
  './certificate/CUXSG離職logo.jpg',
  './certificate/睿生在職logo.jpg',
  './certificate/睿生簽名檔.jpg',
  './certificate/睿生離職logo.jpg',
  './certificate/群創在職logo.jpg',
  './certificate/群創簽名檔.jpg',
  './certificate/群創離職logo.jpg',
  './certificate/群豐駿在職logo.jpg',
  './certificate/群豐駿簽名檔.jpg',
  './certificate/群豐駿離職logo.jpg'
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
    caches.match(event.request).then(function(response) {
      if(response) {
          console.log('fetch request: ' + event.request.url)
          console.log('fetch response: ' + response.status)
          return response;
      } else {
          return fetch(event.request).then(function(res) {
              return caches.open(cacheVersion).then(function(cache) {
                // cache common data
                /*
                if (/\/DomainController\/Common\/.+\/Get.+/.test(event.request.url)) {
                  cache.put(event.request.url, res.clone());                  
                }
                */
                return res;
              })
          }).catch(function(err) {
            console.log('[ServiceWorker] fetch ' + err);
          });
      }
    })
  );
});