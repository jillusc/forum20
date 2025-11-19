import axios from "axios";

export const axiosRes = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies/session auth
});
