import axios from "axios"
import Cookies from "js-cookie";

export default axios.create({
  baseURL: "/dj-rest-auth",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": Cookies.get("csrftoken")
  }
})
