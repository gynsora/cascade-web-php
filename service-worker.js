var CACHE_NAME = 'v2';

var urlsToCache = [
    '/',
    '/sleep.php'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
	caches.open(CACHE_NAME)
	    .then(function(cache) {
		console.log('Opened cache');
		new BroadcastChannel('service-worker').postMessage ('cacheSTART');
		return cache.addAll(urlsToCache);
	    })
	    .then(function() {
		console.log('Done cache');
		new BroadcastChannel('service-worker').postMessage ('cacheDONE');
	    })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
	caches.match(event.request)
	    .then(function(response) {
		// Cache hit - return response
		if (response) {
		    return response;
		}
		return fetch(event.request);
	    })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
    event.waitUntil(
	caches.keys().then(function(cacheNames) {
	    return Promise.all(
		cacheNames.map(function(cacheName) {
		    if (cacheWhitelist.indexOf(cacheName) === -1) {
			return caches.delete(cacheName);
		    }
		})
	    );
	})
    );
});
