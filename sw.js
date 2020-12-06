self.CACHE_NAME = ["app", 2];

const cache_name = self.CACHE_NAME[0] + self.CACHE_NAME[1];

self.addEventListener('fetch', function(event) {
	let cacheRequest = event.request.clone();
	event.respondWith(caches.match(cacheRequest).then(function(response) {
		if(response) return response;
		let fetchRequest = event.request.clone();
		return fetch(fetchRequest).then(function(response) {
			let responseToCache = response.clone();
			caches.open(cache_name).then(function(cache) {
				let cacheSaveRequest = event.request.clone();
				cache.put(cacheSaveRequest, responseToCache);
			});
			console.log("put:", responseToCache)
			return response;
		});
	}));
});

self.addEventListener('activate', function(event) {
	let cachesToDelete = [];
	for(let i=0;i<self.CACHE_NAME[1];i++) {
		cachesToDelete.push(self.CACHE_NAME[0] + i);
	}
	console.log(cachesToDelete);
	// Destroy the cache
	event.waitUntil(caches.keys().then(function(cacheNames) {
		return Promise.all(cacheNames.map(function(cacheName) {
			if(cachesToDelete.indexOf(cacheName) !== -1) {
				console.log("destroy:", cacheName);
				return caches.delete(cacheName);
			}
			return Promise.resolve();
		}));
	}));

});