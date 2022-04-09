// eslint-disable-next-line no-undef
importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate(0),
);

workbox.routing.registerRoute(
  new RegExp("https://reqres.in"),
  workbox.strategies.networkFirst(),
);
