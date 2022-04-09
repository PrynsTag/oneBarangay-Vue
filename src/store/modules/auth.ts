import authService from "@/services/auth/authService"
import type { Commit } from "vuex";

type PayloadError = {
  username: string,
  password: string,
  email: string,
  non_field_errors: string
}

type UserData = {
  username: string,
  email: string,
  password: string
}

const state = {
  userData: { email: null, username: null, password: null },
  token: null,
  emailError: null,
  usernameError: null,
  passwordError: null,
  nonFieldErrors: null,
}

const getters = {
  userData: (state: { userData: UserData }): UserData => { return state.userData },
  token: (state: { token: string }): string => {
    return state.token
  },
  getEmailError: (state: { emailError: string }): string => { return state.emailError },
  getUsernameError: (state: { usernameError: string }): string => { return state.usernameError },
  getPasswordError: (state: { passwordError: string }): string => { return state.passwordError },
  getNonFieldErrors: (state: { nonFieldErrors: string }): string => { return state.nonFieldErrors },
}

const actions = {
  login({ commit }: {commit: Commit} , payload: { email: string; username: string; password: string }) {
    return authService.login(payload)
  },
  logout({ commit }: {commit: Commit}) {
    authService.logout()
      .then(() => { commit("deleteToken") })
  },
  recoverPassword(_: Commit, email: string) {
    authService.passwordReset(email)
  },
  passwordResetConfirm({ commit }: {commit: Commit}, payload: { uid: string; token: string; newPassword1: string; newPassword2: string }) {
    authService.passwordConfirmReset(payload)
      .then(() => {commit("deleteToken")})
  },
  changePassword({ commit }: {commit: Commit}, payload: { oldPassword: string; newPassword1: string; newPassword2: string }) {
    authService.passwordChange(payload)
      .then(() => { commit("changePassword", payload.newPassword1) })
  },
  signUp(_: Commit, payload: { email: string; username: string; password1: string; password2: string }) {
    authService.register(payload)
  },
  // TODO: implement this
  signUpResendConfirmEmail(_: Commit, email: string) {
    authService.registerResendConfirmEmail(email)
  },
  signUpConfirmEmail(_: Commit, key: string) {
    authService.registerVerifyEmail(key)
  },
  resetPassword(_: Commit, email: string) {
    authService.passwordReset(email)
  },
  setUser({ commit }: {commit: Commit}, credentials: { email: string; username: string; password: string; token: string }) {
    commit("setUser", credentials)
  },
}

const mutations = {
  setUser(state: { userData: {}; token: string }, payload: { email: string; username: string; password: string; token: string }) {
    state.userData = {
      email: payload.email,
      username: payload.username,
      password: payload.password,
    }
    state.token = payload.token
    localStorage.setItem("token", payload.token)
  },
  setError(state: { error: {} }, error: PayloadError) {
    state.error = error
  },
  deleteToken(state: { userData: {}; token: null }) {
    state.token = null
    state.userData = { email: null, username: null, password: null }
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("registrationToken")
  },
  changePassword(state: { userData: {password: string} }, newPassword: string) {
    state.userData.password = newPassword
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
