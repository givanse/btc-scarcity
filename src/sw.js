self.__precacheManifest = [].concat(self.__precacheManifest || []);

function isNav(event) {
  return event.request.mode === 'navigate';
};

/**
 * Adding this before `precacheAndRoute` lets us handle all
 * the navigation requests even if they are in precache.
 */
workbox.routing.registerRoute(function({url, event }) {
  console.log('[sw] registerRoute', url);
  return isNav(event);
},
  new workbox.strategies.NetworkFirst({
    // this cache is plunged with every new service worker deploy so we dont need to care about purging the cache.
    cacheName: workbox.core.cacheNames.precache,
    networkTimeoutSeconds: 5, // if u dont start getting headers within 5 sec fallback to cache.
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200], // only cache valid responses, not opaque responses e.g. wifi portal.
      }),
    ],
  })
);

const regex = /^https:\/\/btc-scarcity.netlify.com\/.netlify\/functions.*/;
workbox.routing.registerRoute(function({url, event}) {
  console.log('[sw] registerRoute', url);

  return regex.test(url.pathname); 
}, new workbox.strategies.StaleWhileRevalidate());

// Note: Any custom routing code should be put before
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.setCatchHandler(function({ event }) {
  console.log('[sw] setCatchHandler', event);

  if (isNav(event)) {
    return caches.match(workbox.precaching.getCacheKeyForURL('/index.html'));
  }

  return Response.error();
});
