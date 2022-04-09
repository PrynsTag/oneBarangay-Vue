import type { Commit } from "vuex";

const state = {
  toasts: [],
}
const getters = {
  getToasts: (state: { toasts: [] }): [] => state.toasts,
}
const actions = {
  addToast({ commit }: { commit: Commit }, toast: {}) {
    commit("addToast", toast);
  },
  removeToast({ commit }: { commit: Commit }, message: string) {
    commit("removeToast", message);
  },
}
const mutations = {
  addToast(state: { toasts: [{}] }, toast: {}) {
    const defaultOptions = {
      type: "success",
      icon: "check",
      position: "bottom-right",
      message: "Success!",
      duration: 2500,
      iconSize: "large",
      onClose: null,
    };
    const newObj = Object.assign(defaultOptions, toast);
    state.toasts.push(newObj);
  },
  removeToast(state: { toasts: [{ message: string }] }, message: string) {
    const index = state.toasts.findIndex((toast) => toast.message === message);
    state.toasts.splice(index, 1);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
