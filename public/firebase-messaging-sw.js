/* eslint-disable no-undef */
if ("function" === typeof importScripts) {
  importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js")
  importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js")
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

  firebase.initializeApp({
    apiKey: "AIzaSyBFHIY07QF7_HQOaxgPdng648sZgIyL3Wg",
    authDomain: "onebarangay-malanday.firebaseapp.com",
    projectId: "onebarangay-malanday",
    storageBucket: "onebarangay-malanday.appspot.com",
    messagingSenderId: "151952863728",
    appId: "1:151952863728:web:7660ee42c28cd0b391ad35",
    measurementId: "G-MJRG0CGME7"
  })
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    if (payload.notification === undefined) { return; }
    const notificationData = JSON.parse(payload.notification.body)

    console.log("[firebase-messaging-sw.js] Received background message ", notificationData);

    const { title, body } = notificationData;
    const notificationTitle = title;
    const notificationOptions = {
      body: body,
      icon: "/assets/images/logo/oneBarangay-icon.png"
    };

    return self.registration.showNotification(`[BG] ${notificationTitle}`, { data: notificationOptions, ...notificationOptions })
      .then(() => {
        console.log("[firebase-messaging-sw.js] Notification shown");
      }).catch((err) => {
        console.log("[firebase-messaging-sw.js] Notification not shown", err);
      });
  });

  // workbox.routing.registerRoute(
  //   ({ request }) => request.destination === "image",
  //   new workbox.strategies.CacheFirst(),
  // );
}
