import dashboardService from "@/services/dashboard/dashboardService";
import type { Commit } from "vuex";

const state = {
  ageGroupLabel: null,
  ageGroupValues: null,
  citizenshipLabel: null,
  citizenshipValues: null,
  civilStatusLabel: null,
  civilStatusValues: null,
  socialClassLabel: null,
  socialClassValues: null,
  appointmentLabel: null,
  appointmentValues: null,
  userLoginLabels: null,
  userLoginValues: null,
  userSignUpLabels: null,
  userSignUpValues: null,
  userLoginMonthlyLabels: null,
  userLoginMonthlyValues: null,
  userSignUpMonthlyLabels: null,
  userSignUpMonthlyValues: null,
  totals: null,
  averages: null,
  refreshDate: null,
}
const getters = {
  getAgeGroupLabel: (state: { ageGroupLabel: [] }): string[] => {return state.ageGroupLabel},
  getAgeGroupValues: (state: { ageGroupValues: [] }): number[] => {return state.ageGroupValues},

  getCitizenshipLabel: (state: { citizenshipLabel: [] }): string[] => {return state.citizenshipLabel},
  getCitizenshipValues: (state: { citizenshipValues: [] }): number[] => {return state.citizenshipValues},

  getCivilStatusLabel: (state: { civilStatusLabel: [] }): string[] => {return state.civilStatusLabel},
  getCivilStatusValues: (state: { civilStatusValues: [] }): number[] => {return state.civilStatusValues},

  getSocialClassLabel: (state: { socialClassLabel: [] }): string[] => {return state.socialClassLabel},
  getSocialClassValues: (state: { socialClassValues: [] }): number[] => {return state.socialClassValues},

  getAppointmentLabels: (state: { appointmentLabel: [] }): string[] => {return state.appointmentLabel},
  getAppointmentValues: (state: { appointmentValues: [] }): number[] => {return state.appointmentValues},

  getUserLoginLabel: (state: { userLoginLabels: [] }): string[] => {return state.userLoginLabels},
  getUserLoginValues: (state: { userLoginValues: [] }): number[] => {return state.userLoginValues},

  getUserLoginMonthlyLabels: (state: { userLoginMonthlyLabels: [] }): string[] => {return state.userLoginMonthlyLabels},
  getUserLoginMonthlyValues: (state: { userLoginMonthlyValues: [] }): number[] => {return state.userLoginMonthlyValues},

  getUserSignUpMonthlyLabels: (state: { userSignUpMonthlyLabels: [] }): string[] => {return state.userSignUpMonthlyLabels},
  getUserSignUpMonthlyValues: (state: { userSignUpMonthlyValues: [] }): number[] => {return state.userSignUpMonthlyValues},

  getUserSignUpLabels: (state: { userSignUpLabels: [] }): string[] => {return state.userSignUpLabels},
  getUserSignUpValues: (state: { userSignUpValues: [] }): number[] => {return state.userSignUpValues},

  getTotalData: (state: { totals: [{id: number, label: string, value: number}] }): [{id: number, label: string, value: number}] => {
    return state.totals
  },
  getAverageData: (state: { averages: [{id: number, label: string, value: number}] }): [{id: number, label: string, value: number}] => {
    return state.averages
  },
}
const actions = {
  getAppointmentData({ commit }: { commit: Commit }) {
    dashboardService.getAppointmentList()
      .then((payload) => { commit("setAppointmentData", payload.results) });
  },
  getUserLoginData({ commit }: { commit: Commit }, payload: { refreshDate: string }) {
    dashboardService.getUserLoginList()
      .then((payload) => { commit("setUserLoginData", payload.results) });
  },
  getUserSignUpData({ commit }: { commit: Commit }, payload: { refreshDate: string }) {
    dashboardService.getUserSignUpList()
      .then((payload) => { commit("setUserSignUpData", payload.results) });
  },
  getUserLoginMonthlyData({ commit }: { commit: Commit }, payload: { refreshDate: string }) {
    dashboardService.getUserLoginMonthlyList()
      .then((payload) => { commit("setUserLoginMonthlyData", payload.results) });
  },
  getUserSignUpMonthlyData({ commit }: { commit: Commit }, payload: { refreshDate: string }) {
    dashboardService.getUserSignUpMonthlyList()
      .then((payload) => { commit("setUserSignUpMonthlyData", payload.results) });
  },
  getAgeGroupData({ commit }: {commit: Commit}) {
    dashboardService.getAgeGroupList()
      .then((payload) => { commit("setAgeGroupData", payload.results) })
  },
  getTotalData({ commit }: {commit: Commit}) {
    dashboardService.getTotalList()
      .then((payload) => { commit("setTotalData", payload.results) })
  },
  getAverageData({ commit }: {commit: Commit}) {
    dashboardService.getAverageList()
      .then((payload) => { commit("setAverageData", payload.results) })
  },
  getCitizenshipData({ commit }: {commit:Commit}) {
    dashboardService.getCitizenshipList()
      .then((payload) => {commit("setCitizenshipData", payload.results)})
  },
  getCivilStatusData({ commit }: {commit:Commit}) {
    dashboardService.getCivilStatusList()
      .then((payload) => {commit("setCivilStatusData", payload.results)})
  },
  getSocialClassData({ commit }: {commit:Commit}) {
    dashboardService.getSocialClassList()
      .then((payload) => {commit("setSocialClassData", payload.results)})
  },
  refreshDashboard({ commit }: {commit: Commit}) {
    dashboardService.refreshStats()
      .then((payload) => { commit("setRefreshData", payload.results) })
  }
}
const mutations = {
  setAppointmentData(state: { appointmentLabel: string[], appointmentValues: number[] }, payload: { label: string; value: number }[]) {
    state.appointmentLabel = payload.map(item => item.label);
    state.appointmentValues = payload.map(item => item.value);
  },
  setUserLoginData(state: { userLoginLabels: string[], userLoginValues: number[] }, payload: { label: string; value: number }[]) {
    state.userLoginLabels = payload.map(item => item.label);
    state.userLoginValues = payload.map(item => item.value);
  },
  setUserSignUpData(state: { userSignUpLabels: string[], userSignUpValues: number[] }, payload: { label: string; value: number }[]) {
    state.userSignUpLabels = payload.map(item => item.label);
    state.userSignUpValues = payload.map(item => item.value);
  },
  setUserLoginMonthlyData(state: { userLoginMonthlyLabels: string[], userLoginMonthlyValues: number[] }, payload: { label: string; value: number }[]) {
    state.userLoginMonthlyLabels = payload.map(item => item.label);
    state.userLoginMonthlyValues = payload.map(item => item.value);
  },
  setUserSignUpMonthlyData(state: { userSignUpMonthlyLabels: string[], userSignUpMonthlyValues: number[] }, payload: { label: string; value: number }[]) {
    state.userSignUpMonthlyLabels = payload.map(item => item.label);
    state.userSignUpMonthlyValues = payload.map(item => item.value);
  },
  setAgeGroupData(state: { ageGroupLabel: string[]; ageGroupValues: number[] }, payload: {label: string; value: number}[]) {
    state.ageGroupLabel = payload.map(item => item.label)
    state.ageGroupValues = payload.map(item => item.value)
  },
  setTotalData(state: { totals: { id: number; label: string; value: number }[] }, payload: {id: number; label: string; value: number}[]) {
    state.totals = payload
  },
  setAverageData(state: { averages: { id: number; label: string; value: number }[] }, payload: {id: number; label: string; value: number}[]) {
    state.averages = payload
  },
  setCitizenshipData(state: { citizenshipLabel: string[]; citizenshipValues: number[] }, payload: {id: number; label: string; value: number}[]) {
    state.citizenshipLabel = payload.map(item => item.label)
    state.citizenshipValues = payload.map(item => item.value)
  },
  setCivilStatusData(state: { civilStatusLabel: string[]; civilStatusValues: number[] }, payload: { id: number; label: string; value: number }[]) {
    state.civilStatusLabel = payload.map(item => item.label)
    state.civilStatusValues = payload.map(item => item.value)
  },
  setSocialClassData(state: { socialClassLabel: string[]; socialClassValues: number[] }, payload: {id: number; label: string; value: number}[]) {
    state.socialClassLabel = payload.map(item => item.label)
    state.socialClassValues = payload.map(item => item.value)
  },
  setRefreshData(state: { refreshDate: string }, payload: {created_at: string}) {
    state.refreshDate = payload.created_at
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
