import type { Commit } from "vuex";

const state = {
  dialogs: []
}
const getters = {
  getDialogs: (state: { dialogs: [] }): [] => state.dialogs
}
const actions = {
  addDialog({ commit }: { commit: Commit }, dialog: {}) {
    commit("addDialog", dialog);
  },
  removeDialog({ commit }: { commit: Commit }, message: string) {
    commit("removeDialog", message);
  },
}
const mutations = {
  addDialog(state: { dialogs: [{}] }, dialog: {}) {
    const defaultOptions = {
      type: "success",
      icon: "check",
      showModal: true,
      duration: 10000,
      maxWidth: "500px",
      maxHeight: "500px",
      redirectTo: null,
    }
    const newObj = Object.assign(defaultOptions, dialog);
    state.dialogs.push(newObj);
  },
  removeDialog(state: { dialogs: [{ message: string }] }, message: string) {
    const index = state.dialogs.findIndex((dialog) => dialog.message === message);
    state.dialogs.splice(index, 1);
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
