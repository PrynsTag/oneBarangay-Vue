import api from "@/services/appointment/appointmentApi"

export default {
  getAppointmentList() {
    return api.get("/?limit=101&ordering=-created_at").then(response => response.data);
  },
  createAppointment (appointment: any) {
    return api.post("/", appointment).then(response => response.data);
  },
  updateAppointmentStatus (appointment: any) {
    return api.put(`/status/${appointment.id}/`, appointment, { baseURL: "/api" });
  },
  deleteAppointmentItem (id: number) {
    return api.delete(`/${id}/`).then(response => response.data);
  }
}
