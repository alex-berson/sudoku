const cacheName = 'cache-v1';
const files = [
  'https://alex-berson.github.io/sudoku/',
  'index.html',
  'css/style.css',
  'js/data.js',
  'js/sudoku.js',
  'fonts/roboto-regular-webfont.woff',
  'fonts/roboto-bold-webfont.woff'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
      cache.addAll(files);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});