const CACHE_NAME = "moCache-v01";
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
  "./assets/icon/icon-512.png",
  "./assets/font/Exo-Bold.ttf",
  "./assets/font/Exo-BoldItalic.ttf",
  "./assets/font/Exo-LightItalic.ttf",
  "./assets/font/Exo-Regular.ttf",
  "./assets/font/material-icons.woff2",
  "./assets/img/black-widow.jpg",
  "./assets/img/icon-color.svg",
  "./assets/img/icon-outline.svg",
  "./assets/img/jojo-rabbit.jpg",
  "./assets/img/kingsman.jpg",
  "./assets/img/nttd.jpg",
  "./assets/img/pp.jpg",
  "./assets/img/tenet.jpg",
  "./assets/img/the-dark-knght.jpg",
  "./assets/img/the-prestige.jpg",
  "./assets/img/watchmen.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// Using asset from cache if its exist, if not then using fetch request
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker using asset from cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker fetch asset from server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

//Deleting Old Cache
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " deleted!");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});