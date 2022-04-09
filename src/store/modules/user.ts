import userService from "@/services/user/userService";
import type { Commit } from "vuex";

type ProfilePayload = {
  created_at: string;
  updated_at: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  age: number;
  birth_place: string;
  birth_date: string;
  civil_status: string;
  address: string;
  phone_number: string;
}

type AppointmentPayload = {
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
}

type UserPayload = {
  id: number;
  username: string,
  last_login: string,
  is_superuser: boolean,
  email: string,
  is_staff: boolean,
  is_active: boolean,
  date_joined: string,
}

const state = {
  profile: {} as ProfilePayload,
  user: {} as UserPayload,
  appointmentList: [] as AppointmentPayload[],
  userName: "Vasili S",
}
const getters = {
  profileData: (state: { profile: ProfilePayload }): ProfilePayload => state.profile,
  userData: (state: { user: UserPayload }): UserPayload => state.user,
  getUserId: (state: { user: UserPayload }): number => state.user.id,
  appointmentList: (state: { appointmentList: AppointmentPayload[] }): AppointmentPayload[] => state.appointmentList,
  getUserName: (state: { userName: string }) => localStorage.getItem("username") || state.userName,
  getProfileImage: (state: { profile: ProfilePayload }) => state.profile.profile_image,
}
const actions = {
  getProfile: () => userService.getProfile(),
  getUser: () => userService.getUser(),
  getAppointment: () => userService.getAppointment(),
  changeProfileImage: ({ commit }: { commit: Commit }, data: {username: string, image: File}) => userService.changeImage(data),
  updateProfile: ({ commit }: { commit: Commit }, data: { username: string, civil_status: string, address: string, phone: string }) => userService.updateProfile(data),
}
const mutations = {
  setProfile(state: { profile: ProfilePayload }, payload: ProfilePayload): void {
    state.profile = payload;
  },
  setAppointment(state: { appointmentList: AppointmentPayload[] }, payload: AppointmentPayload[]): void {
    state.appointmentList = payload;
  },
  setProfileImage(state: { profile: ProfilePayload }, payload: string): void {
    state.profile.profile_image = payload;
  },
  setUser(state: { user: UserPayload }, payload: UserPayload): void {
    state.user = payload;
  },
  changeUserName(state: { userName: string }, newUserName: string): void {
    localStorage.setItem("username", newUserName);
    state.userName = newUserName;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
