const cacheName = 'souvenir-mobil-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/styles.css',
  '/images/showroom.jpg',
  '/images/souvenir1.jpg',
  '/images/souvenir2.jpg',
  '/images/icon-512x512.png',
  '/offline.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Cache opened');
            // Gunakan Promise.all untuk memeriksa setiap URL
            return Promise.all(assetsToCache.map((url) => {
                return fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${url}: ${response.status}`);
                        }
                        return cache.add(url); // Menambahkan ke cache
                    })
                    .catch(error => {
                        console.error(`Failed to cache ${url}: ${error}`);
                    });
            }));
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Jika fetch gagal, kembalikan offline.html
            return caches.match('/offline.html');
        })
    );
});
