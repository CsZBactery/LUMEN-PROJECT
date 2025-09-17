// Define un nombre para el caché actual
const CACHE_NAME = 'lumen-cache-v1';

// Lista de archivos que se guardarán en el caché para funcionar offline
const urlsToCache = [
  '/',
  '/index.html',
  // Agrega aquí las rutas a tus CSS, JS, imágenes y fuentes
  '/styles/main.css', 
  '/images/portada.jpg',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png'
];

// Evento 'install': se dispara cuando el Service Worker se instala
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página solicita un recurso (ej. una imagen, un css)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en el caché, lo devuelve. Si no, lo busca en la red.
        return response || fetch(event.request);
      })
  );
});