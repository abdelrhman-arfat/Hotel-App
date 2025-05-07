import { BACKEND_URL } from "@/app/constants/ENV";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default axiosInstance;
