import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL)
const api = axios.create({
  baseURL,
  headers: {
    key: import.meta.env.VITE_API_KEY,
  }
});

export default api
