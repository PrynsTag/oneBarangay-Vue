import axios from "axios"
import Cookies from "js-cookie";

export default axios.create({
  baseURL: "/api/appointment",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Token ${localStorage.getItem("token")}`,
    "X-CSRFToken": Cookies.get("csrftoken")
  },
})
