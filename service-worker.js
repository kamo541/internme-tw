const CACHE_NAME = 'internme-cache-v1';
const urlsToCache = [
  'index.html',
  'confirm.html',
  'duration.html',
  'select-course.html',
  'select-province.html',
  'locations.html',
  'data.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event =>
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)))
);
self.addEventListener('fetch', event =>
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)))
);