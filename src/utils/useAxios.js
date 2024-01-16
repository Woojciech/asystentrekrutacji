import axios from "axios"

const axiosPublic = axios.create({
    // baseURL: "http://localhost:8080"
    baseURL: process.env.REACT_APP_BACKEND_URL
})

export default axiosPublic;