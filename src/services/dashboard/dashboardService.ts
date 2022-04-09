import api from "@/services/dashboard/dashboardApi";

export default {
  getAgeGroupList: () => api.get("/age-group").then(response => response.data),
  getAgeGroup: (id: string) => api.get(`/age-group/${id}`).then(response => response.data),

  getAppointmentList: () => api.get("/appointment/").then(response => response.data),
  getAppointment: (id: string) => api.get(`/appointment/${id}`).then(response => response.data),

  getAverageList: () => api.get("/average").then(response => response.data),
  getAverage: (id: string ) => api.get(`/average/${id}`).then(response => response.data),

  getCitizenshipList: () => api.get("/citizenship").then(response => response.data),
  getCitizenship: (id: string) => api.get(`/citizenship/${id}`).then(response => response.data),

  getCivilStatusList: () => api.get("/civil-status").then(response => response.data),
  getCivilStatus: (id: string) => api.get(`/civil-status/${id}`).then(response => response.data),

  getRefresh: () => api.get("/refresh").then(response => response.data),
  refreshStats: () => api.post("/refresh/", { duration: null }).then(response => response.data),

  getSocialClassList: () => api.get("/social-class").then(response => response.data),
  getSocialClass: (id: string) => api.get(`/social-class/${id}`).then(response => response.data),

  getTotalList: () => api.get("/totals").then(response => response.data),
  getTotal: (id: string) => api.get(`/total/${id}`).then(response => response.data),

  getUserLoginList: () => api.get("/user-login").then(response => response.data),
  getUserLogin: (id: string) => api.get(`/user-login/${id}`).then(response => response.data),

  getUserSignUpList: () => api.get("/user-signup").then(response => response.data),
  getUserSignUp: (id: string) => api.get(`/user-signup/${id}`).then(response => response.data),

  getUserLoginMonthlyList: () => api.get("/user-login-by-month").then(response => response.data),
  getUserSignUpMonthlyList: () => api.get("/user-signup-by-month").then(response => response.data),
};
