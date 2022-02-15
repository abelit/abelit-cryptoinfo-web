import axios, { AxiosInstance } from "axios";
import store from "@/store";
import notification from "ant-design-vue/es/notification";

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// request interceptor
service.interceptors.request.use();

export default service;
