import { firebaseMessaging } from "@/firebase";
import Swal from "sweetalert2";
import notificationService from "@/services/notification/notificationService";
import { getToken } from "firebase/messaging"
import type { Commit } from "vuex";

type notificationState = {
  registrationToken: string;
};
type NotificationPayload = {
  id: number,
  name: string,
  registration_id: string,
  device_id: number,
  active: boolean,
  date_created: string,
  cloud_message_type: string,
  application_id: string
}

const state: notificationState = {
  registrationToken: "",
}
const getters = {
  getRegistrationToken: (state: notificationState): string => state.registrationToken || localStorage.getItem("registrationToken") || "",
}
const actions = {
  subscribeToNotifications({ commit }: { commit: Commit }, userId: number) {
    Swal.fire({
      title: "Subscribing to notifications",
      text: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
        Notification.requestPermission(permission => {
          if (permission === "granted") {
            getToken(firebaseMessaging, { vapidKey: process.env.vapidKey }).then(token => {
              notificationService.subscribeToNotification({ registration_id: token, user_id: userId, cloud_message_type: "FCM" }).then(() => {
                Swal.close();
                commit("setRegistrationToken", { registration_id: token });
                console.log(token);
                Swal.fire({
                  title: "Subscribed to notifications!",
                  text: "You will now receive notifications",
                  icon: "success"
                })
              }).catch((error) => {
                Swal.fire({
                  title: "Error",
                  html: `Something went wrong! <br> ${error} <br> Please try again later.`,
                  icon: "error"
                });
              });
            }).catch((error) => {
              Swal.fire({
                title: "Error",
                html: `Something went wrong! <br> ${error} <br> Please try again later.`,
                icon: "error"
              });
            });
          } else {
            Swal.close();
            Swal.fire({
              title: "Error",
              text: "Notification permission denied",
              icon: "error"
            })
          }
        }).catch(error => {
          Swal.close();
          Swal.fire({
            title: "Error",
            html: `Something went wrong! <br> ${error} <br> Please try again later.`,
            icon: "error"
          })
        })
      },
    })
  },
  unsubscribeFromNotifications({ commit, getters }: {commit: Commit, getters: any}) {
    const token = getters.getRegistrationToken;
    Swal.fire({
      title: "Unsubscribing from notifications",
      text: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
        notificationService.unsubscribeFromNotification(token).then(() => {
          Swal.close();
          commit("unsetRegistrationToken");
          Swal.fire({
            title: "Unsubscribed from notifications!",
            text: "You will no longer receive notifications",
            icon: "success"
          })
        }).catch((error) => {
          Swal.fire({
            title: "Error",
            html: `Something went wrong! <br> ${error} <br> Please try again later.`,
            icon: "error"
          });
        });
      },
    })
  },
  getNotificationData({ commit }: { commit: Commit }, payload: { registration_id: string }) {
    notificationService.getNotificationData(payload.registration_id).then(response => {
      commit("setRegistrationToken", response.data);
    }).catch(error => {
      Swal.fire({
        title: "Error",
        html: `Something went wrong! <br> ${error} <br> Please try again later.`,
        icon: "error"
      });
    })
  },
  getNotificationByAuthenticated({ commit }: { commit: Commit }) {
    notificationService.getNotificationDataByMe().then(response => {
      commit("setRegistrationToken", response.data);
    }).catch(error => {
      console.log(error);
    })
  },
}
const mutations = {
  setRegistrationToken(state: notificationState, data: NotificationPayload): void {
    localStorage.setItem("registrationToken", data.registration_id);
    state.registrationToken = data.registration_id;
  },
  unsetRegistrationToken(state: notificationState): void {
    localStorage.removeItem("registrationToken");
    state.registrationToken = "";
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
