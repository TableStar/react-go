import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACK_API,
});

export default Api;
