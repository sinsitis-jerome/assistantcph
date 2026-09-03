/* Service worker minimal pour Mon Assistant CPH.
   Rôle : rendre l'application installable sur l'écran d'accueil et
   permettre une ouverture hors-ligne basique (l'app ne dépend d'aucun
   serveur — toutes les données restent dans le localStorage de
   l'appareil). Ne gère aucune donnée personnelle.

   Pensez à incrémenter CACHE_NAME à chaque nouvelle version envoyée aux
   testeurs : cela force la suppression de l'ancien cache et le
   téléchargement de la nouvelle version au prochain lancement. */
var CACHE_NAME = "cph-toolbox-v27";
var CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(CORE_ASSETS).catch(function(){ /* pas bloquant */ });
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.map(function(name){
        if(name !== CACHE_NAME) return caches.delete(name);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* Page principale (navigation) : on tente d'abord le réseau pour que les
   testeurs récupèrent toujours la dernière version quand ils sont en
   ligne, avec repli sur le cache si le réseau échoue (hors-ligne). Le
   reste (polices, icônes...) : cache d'abord, réseau en repli. */
self.addEventListener("fetch", function(event){
  var req = event.request;
  if(req.method !== "GET") return;

  if(req.mode === "navigate"){
    event.respondWith(
      /* cache:"no-store" force un vrai aller-retour réseau (contourne le
         cache HTTP du navigateur, pas seulement le Cache Storage), pour
         que la dernière version publiée soit toujours servie quand
         l'appareil est en ligne. */
      fetch(req, { cache: "no-store" }).then(function(res){
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put("./index.html", copy); });
        return res;
      }).catch(function(){
        return caches.match("./index.html");
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function(cached){
      if(cached) return cached;
      return fetch(req).then(function(res){
        if(res && res.status === 200 && res.type === "basic"){
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
        }
        return res;
      }).catch(function(){ return cached; });
    })
  );
});
