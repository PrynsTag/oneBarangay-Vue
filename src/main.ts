import { onMessage } from "firebase/messaging";
import { createApp } from "vue";
import { createGtm } from "vue-gtm";
import { createI18n } from "vue-i18n";
import { VuesticPlugin } from "vuestic-ui";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuesticGlobalConfig from "./services/vuestic-ui/global-config";
import store from "@/store";
import SetupCalendar from "v-calendar";
import { firebaseMessaging } from "@/firebase";
import Swal from "sweetalert2";

// TODO: add i18n for {username} {token} {verify-email} {confirm/new-password} keys
const i18nConfig = {
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: require("@/i18n/en.json"),
    ch: require("@/i18n/cn.json"),
    es: require("@/i18n/es.json"),
    ir: require("@/i18n/ir.json"),
    br: require("@/i18n/br.json"),
  },
};

const app = createApp(App);
app.use(store);
app.use(router);
if (process.env.VUE_APP_GTM_ENABLED === "true") {
  const gtmConfig = {
    id: process.env.VUE_APP_GTM_KEY,
    debug: false,
    vueRouter: router,
  };
  app.use(createGtm(gtmConfig));
}
app.use(createI18n(i18nConfig));
app.use(VuesticPlugin, vuesticGlobalConfig);
app.use(SetupCalendar, {});
app.config.globalProperties.$messaging = firebaseMessaging;
app.config.globalProperties.$Swal = Swal;
app.mount("#app");

onMessage(firebaseMessaging, (payload) => {
  if (payload.notification === undefined) { return; }
  const notificationData = JSON.parse(payload.notification.body!)

  console.log("[firebase-messaging-sw.js] Received foreground message ", notificationData);

  const { title, body } = notificationData;
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
    icon: "/assets/images/logo/oneBarangay-icon.png",
  };

  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification(notificationTitle, notificationOptions)
      .then(() => {
        console.log("[firebase-messaging-sw.js] Notification shown");
      })
      .catch((error) => {
        console.error("[firebase-messaging-sw.js] Error showing notification", error);
      });
  });
});
