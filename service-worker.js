const CACHE_NAME = "oracle-02";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./manifest.json",
  "./pages/home.html",
  "./pages/about.html",
  "./pages/contact.html",
  "./pages/upcoming.html",
  "./assets/css/materialize.min.css",
  "./assets/css/app.css",
  "./assets/css/font.css",
  "./assets/js/materialize.min.js",
  "./assets/js/nav.js",
  "./assets/icon/icon-48.png",
  "./assets/icon/icon-96.png",
  "./assets/icon/icon-128.png",
  "./assets/icon/icon-144.png",
  "./assets/icon/icon-192.png",
  "./assets/icon/icon-256.png",
  "./assets/icon/icon-384.png",
  "./assets/icon/icon-512.png"
];
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
    
            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                    console.log("ServiceWorker: cache " + cacheName + " dihapus");
                    return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});