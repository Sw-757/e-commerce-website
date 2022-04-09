self.addEventListener('install' , (event)=>{
    console.log("sw is installed")
    event.waitUntil(
    caches.open("static")
    .then((Cache)=>{
        Cache.addAll([
           'https://sw-757.github.io/e-commerce-website/',
           'https://sw-757.github.io/e-commerce-website/css/styles.css',
           'https://sw-757.github.io/e-commerce-website/Js/app.js',
           'https://sw-757.github.io/e-commerce-website/index.html'
 
        ]).catch((error)=>{
            console.log(error)
        })
    })
    );
})

self.addEventListener('activate' , ()=>{
    console.log("sw is Activated")
})


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // The responce is in the cache
        if (response) {
          return response;
        }

        // No cache match, we attempt to fetch it from the network
        return fetch(event.request);
      }
    )
  );
});


self.addEventListener('push', e=> {
console.log('push', e);
var body;

if (e.data) {
body = e.data.text();
} else {
body = 'Push message no payload';
}
var options = {
body: body,
icon: 'watch.jpg',
vibrate: [100, 50, 100],
data: {
dateOfArrival: Date.now(),
primaryKey: 1
},
actions: [
{action: 'explore', title: 'Explore this new world',
icon: 'shirt.jpg'},
{action: 'close', title: 'I don\'t want any of this',
icon: 'watch.jpg'},
]
};
e.waitUntil(
self.registration.showNotification('Push Notification', options)
);
});

self.addEventListener('sync', function(event) {
	console.log("sync event", event);
});
