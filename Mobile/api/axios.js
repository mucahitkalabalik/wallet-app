import axios from "axios";
import Constants from "expo-constants";

const { BaseURL } = Constants.expoConfig.extra;

const axiosInstance = axios.create({
  baseURL: BaseURL || "http://localhost:5001/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


// axiosInstance.interceptors.request.use(request => {
//   console.log('📤 Request:', request);
//   return request;
// });

// axiosInstance.interceptors.response.use(
//   response => {
//     console.log('📥 Response:', response);
//     return response;
//   },
//   error => {
//     console.log('❌ Error:', error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
