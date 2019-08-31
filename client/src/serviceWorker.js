console.log("[Komorebi] sw.js");
workbox.core.setCacheNameDetails({
  precahce: "komorebi-precache-q",
  runtime: "komorebi-runtime-q"
});

workbox.routing.registerRoute(
  /.*/,
  new workbox.strategies.NetworkFirst({
    // cacheName: "pageCache"
  })
);
