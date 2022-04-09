import appointmentService from "@/services/appointment/appointmentService";
import type { Commit } from "vuex";

type Appointment = {
  id: 0,
  document: string,
  status: string,
  email: string,
  created_at: string,
  recipient_name: string,
  purpose: string,
  government_id: string,
  start_appointment: string,
  end_appointment: string,
};

type AppointmentPayload = {
  appointmentList: [];
  appointmentCount: number;
  appointmentNext: string;
  appointmentPrevious: string;
}

const state = {
  appointmentList: null,
  appointmentCount: null,
  appointmentNext: null,
  appointmentPrevious: null,
  appointmentItem: null,
}
const getters = {
  getAppointmentList: (state: { appointmentList: []}): AppointmentPayload[] => { return state.appointmentList },
  getAppointment: (state: {appointmentItem: {}}): {} => { return state.appointmentItem },
  getAppointmentCount: (state: AppointmentPayload): number => { return state.appointmentCount },
  getAppointmentNext: (state: AppointmentPayload): string => { return state.appointmentNext },
  getAppointmentPrevious: (state: AppointmentPayload): string => { return state.appointmentPrevious },
}
const actions = {
  getAppointmentList({ commit }: {commit: Commit}) {
    appointmentService.getAppointmentList()
      .then(payload => { commit("setAppointmentList", payload); });
  },
  createAppointment({ commit }: {commit: Commit}, appointment: {}) {
    return appointmentService.createAppointment(appointment)
  },
  updateAppointmentStatus({ commit }: {commit: Commit}, appointment: Appointment) {
    return appointmentService.updateAppointmentStatus(appointment)
  },
  deleteAppointment({ commit }: {commit: Commit}, id: number) {
    return appointmentService.deleteAppointmentItem(id)
  },
}
const mutations = {
  setAppointmentList(state: AppointmentPayload , payload: {count: number, next: string, previous: string, results: []}) {
    const data = payload.results
    state.appointmentList = data;
    state.appointmentCount = payload.count;
    state.appointmentNext = payload.next;
    state.appointmentPrevious = payload.previous;
  },
  setAppointmentItem(state: { appointmentItem: {} }, appointmentItem: {}) {
    state.appointmentItem = appointmentItem;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
