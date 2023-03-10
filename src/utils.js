import  axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://todo-v3-server.onrender.com/api"
})