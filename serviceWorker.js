const cache_container = "static_v2";
const files = [
    "./",
    "./source.css",
    "./source.js"
]

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cache_container)
        .then(cache => {
            cache.addAll(files)
        })
    )    
})

self.addEventListener('activate', function(event){
    console.log("service worker activated", event);
})
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request) 
        .then(response => {
           
                return response || fetch(event.request);
            
        })
    )
})