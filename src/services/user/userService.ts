import Cookies from "js-cookie";
import api from "./userApi";

export default {
  getProfile: () => api.get("/me/")
    .then(res => res.data),
  getUser: () => api.get("/me/", { baseURL: "/api/user" })
    .then(res => res.data),
  getAppointment: () => api.get("/me/", { baseURL: "/api/appointment" })
    .then(res => res.data),
  changeImage: (data: { username: string, image: File }) => {
    const { username, image } = data;
    const formData = new FormData();
    formData.append("profile_image", image);

    return api.patch("", formData,
      {
        baseURL: `/api/profile/change_photo/${username}/`,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      .then(res => res.data);
  },

  updateProfile: (data: {  username: string, phone: string, address: string, civil_status: string }) => {
    const { username, phone, address, civil_status } = data;
    const formData = new FormData();
    formData.append("phone_number", phone);
    formData.append("address", address);
    formData.append("civil_status", civil_status);

    return api.patch(`/${username}/`, formData,
      { headers: { "X-CSRFToken": Cookies.get("csrftoken") }
      })
      .then(res => res.data);
  },
};
