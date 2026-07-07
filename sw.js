/* Pusselriket service worker: nätet först, cachen som reserv offline.
   ponytail: network-first på allt — fem små filer, ingen finess behövs. */
const CACHE = 'pusselriket-v1';
const FILER = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILER)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request).then(svar => {
      const kopia = svar.clone();
      caches.open(CACHE).then(c => c.put(e.request, kopia));
      return svar;
    }).catch(() =>
      caches.match(e.request, { ignoreSearch: true })
        .then(tr => tr || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined))
    )
  );
});
