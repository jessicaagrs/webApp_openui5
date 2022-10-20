const cacheVersion = "v1";

this.addEventListener('install', function(event) {
  console.info("Evento install ws:", event);
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      console.info("Abriu o Cache", cache);
      return cache.addAll([
        '/index.html',
        '/webapp/Component.js',
        '/webapp/css/style.css'        
      ]);
    })
  );
});

//Responde a solicitação
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      console.info("Retorno do Cache:", resp);
      return resp || fetch(event.request).then(function(response) {
        caches.open(cacheVersion).then(function(cache) {
          console.info("Cache Atualizado: ", cache);
          cache.put(event.request, response.clone());
        });
        return response;
      });
    })
  );
});

//Deletar cache Antigo ao ativar o novo
this.addEventListener('activate', function(event) {
  var cacheWhitelist = [cacheVersion];
  console.info('service worker ativado')
  
  event.waitUntil(
    caches.keys().then(function(keyList) {
      console.info('caches', keyList);
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
