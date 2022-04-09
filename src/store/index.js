import { createStore } from "vuex";
import authModule from "./modules/auth";
import userModule from "./modules/user";
import dashboardModule from "./modules/dashboard";
import appointmentModule from "./modules/appointment";
import announcementModule from "./modules/announcement";
import rbiModule from "./modules/rbi";
import toastModule from "./modules/toast";
import dialogModule from "./modules/dialog";
import notificationModule from "./modules/notification";

export default createStore({
  modules: {
    auth: authModule,
    user: userModule,
    dashboard: dashboardModule,
    appointment: appointmentModule,
    announcement: announcementModule,
    rbi: rbiModule,
    toast: toastModule,
    dialog: dialogModule,
    notification: notificationModule
  },
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    isSidebarMinimized: false,
  },
  getters: {
    getIsSidebarMinimized: state => state.isSidebarMinimized,
  },
  actions: {},
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized;
    },
  },
});
