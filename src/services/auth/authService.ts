import api from "@/services/auth/authApi"

export default {
  login(payload: { email: string; username: string; password: string }) {
    return api.post("/login/", payload)
      .then(response => response.data.key)
  },
  logout() {
    return api.post("/logout/")
      .then(response => response.data)
  },
  passwordReset(email: string) {
    return api.post("/password/reset/", { email })
      .then(response => response.data)
  },
  passwordConfirmReset(payload: { uid: string; token: string; newPassword1: string; newPassword2: string }) {
    return api.post("/password/reset/confirm/", {
      uid: payload.uid,
      token: payload.token,
      "new_password1": payload.newPassword1,
      "new_password2": payload.newPassword2
    })
      .then(response => response.data)
  },
  passwordChange(payload: { oldPassword: string; newPassword1: string; newPassword2: string}) {
    return api.post("/password/change/", payload)
      .then(response => response.data)
  },
  register(payload: { email: string; username: string; password1: string; password2: string }) {
    return api.post("registration/", payload)
      .then(response => response.data)
  },
  registerResendConfirmEmail(email: string) {
    return api.post(`registration/resend-email/${email}`)
      .then(response => response.data)
  },
  registerVerifyEmail(key: string) {
    return api.post("registration/verify-email/", { key })
      .then(response => response.data)
  },
}
