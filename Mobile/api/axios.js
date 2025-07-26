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

export default axiosInstance;
