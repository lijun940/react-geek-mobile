import { Toast } from "antd-mobile";
import axios from "axios";
import { getTokens } from "./storage";

const instance = axios.create({
  timeout: 5000,
  baseURL: "https://geek.itheima.net/v1_0/",
});

instance.interceptors.request.use(
  (config) => {
    const token = getTokens().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      Toast.info(error.response.data.message);
    } else {
      Toast.info("网络繁忙，请稍后重试");
    }
    return Promise.reject(error);
  }
);
export default instance;