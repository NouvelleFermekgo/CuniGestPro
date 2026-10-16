/* Service worker de Nouvelle Ferme Cuniculture Pro.
   Rôle : garder l'application et ses ressources en mémoire pour qu'elle s'ouvre sans Internet.
   Pour publier une nouvelle version, changez le numéro ci-dessous. */
var VERSION = 'nfcp-v3';
var CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon-32.png'];
var EXTERNAL = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&display=swap'
];
var EXTERNAL_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) {
      return c.addAll(CORE).then(function () {
        // Ressources externes : on essaie, sans bloquer l'installation si la connexion manque.
        return Promise.all(EXTERNAL.map(function (u) {
          return fetch(new Request(u, { mode: 'no-cors' })).then(function (r) { return c.put(u, r); }).catch(function () {});
        }));
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Page principale : on prend la version en ligne si possible, sinon celle en mémoire.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (r) {
        var copy = r.clone();
        caches.open(VERSION).then(function (c) { c.put('./index.html', copy); });
        return r;
      }).catch(function () { return caches.match('./index.html'); })
    );
    return;
  }

  // Outil PDF et polices : version en mémoire d'abord, mise à jour en arrière-plan.
  if (EXTERNAL_HOSTS.indexOf(url.hostname) !== -1) {
    e.respondWith(
      caches.open(VERSION).then(function (c) {
        return c.match(req).then(function (hit) {
          var net = fetch(req).then(function (r) { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(function () { return hit; });
          return hit || net;
        });
      })
    );
    return;
  }

  // Fichiers de l'application : mémoire d'abord.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (r) {
          var copy = r.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
          return r;
        });
      })
    );
  }
});
