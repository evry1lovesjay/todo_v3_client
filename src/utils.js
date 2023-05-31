import  axios from "axios";


const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;
  
  export const axiosInstance = axios.create({
      baseURL: `${API_URL}/api`   
  })

// export const axiosInstance = axios.create({
//     baseURL: "https://todo-v3-server.onrender.com/api"
// })

// export const axiosInstance = axios.create({
//     baseURL: "http://localhost:6400/api"
// })