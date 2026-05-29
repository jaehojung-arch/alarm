const CACHE = 'yerum-v1';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sounds/차임벨01.mp3',
  './sounds/차임벨02.mp3',
  './sounds/차임벨03.mp3',
  './sounds/차임벨04.mp3',
  './sounds/차임벨05.mp3',
  './sounds/차임벨06.mp3',
  './sounds/차임벨07.mp3',
  './sounds/차임벨08.mp3',
  './sounds/차임벨09.mp3',
  './sounds/차임벨10.mp3',
  './sounds/차임벨11.mp3',
  './sounds/차임벨12.mp3',
  './sounds/차임벨13.mp3',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
