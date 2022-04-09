

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('static').then(function(cache) {
     return cache.addAll([
        '/',
        '/css/style.css',
        '/js/app.js',
        '/index.html'      
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   });
