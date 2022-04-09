import axios from "axios"

export default axios.create({
  baseURL: "/api/profile",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Token ${localStorage.getItem("token")}`,
  },
})
