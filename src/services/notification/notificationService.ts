import api from "./notificationApi";


export default {
    subscribeToNotification: (data: {registration_id: string, user_id: number, cloud_message_type: string }) => api.post("", data),
    unsubscribeFromNotification: (registrationId: string) => api.delete(`/${registrationId}/`),
    getNotificationData: (registrationId: string) => api.get(`/${registrationId}/`),
    getNotificationDataByMe: () => api.get("/me/"),
}
