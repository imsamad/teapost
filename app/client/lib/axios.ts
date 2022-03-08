import axios from "axios";
import { getCookies } from "./cookies";

axios.interceptors.request.use(
  function (config) {
    const user = getCookies();

    // @ts-ignore
    config.headers.common["Authorization"] = `Bearer ${user?.accessToken}`; // @ts-ignore
    config.baseURL = process.env.NEXT_PUBLIC_API_URL;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const instance = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default instance;
