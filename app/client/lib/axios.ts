import axios from "axios";
import { getCookies } from "./getUserFromCookie";

// const { user, refreshToken } = getCookies();
// console.log({ "Hello from axis instace": user, refreshToken });
// const instance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     Authorization: `Bearer ${user?.accessToken}`,
//     "x-ref-token": refreshToken,
//   },
// });
axios.interceptors.request.use(
  function (config) {
    console.log("config run");
    const { user } = getCookies();
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${user?.accessToken}`;
    // @ts-ignore
    config.headers.common["Authorization"] = `Bearer ${user?.accessToken}`; // @ts-ignore
    config.headers.common["x-ref-token"] =
      "refreshToken ? refreshToken : false";
    config.baseURL = process.env.NEXT_PUBLIC_API_URL;

    return config;
  },
  function (error) {
    // Do something with request error
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
// if (user)
//   instance.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${user?.accessToken}`;
// if (refreshToken)
//   instance.defaults.headers.common["x-ref-token"] = refreshToken;

export default instance;
