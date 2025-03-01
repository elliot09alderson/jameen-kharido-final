import axios from "axios";
const local = import.meta.env.VITE_APP_LOCALBACKEND;
console.log("the backend is on = ", import.meta.env.VITE_APP_LOCALBACKEND);


const api = axios.create({
  baseURL: `${local}/api/v1`,
  withCredentials: true,
});
export default api;
