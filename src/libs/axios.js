import axios from "axios";
import NProgress from "nprogress";
import store from "@/store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 1000000
});
instance.interceptors.request.use(
  config => {
    if (store.getters["auth/user"].token) {
      config.headers = {
        Authorization: `Bearer ${store.getters["auth/user"].token}`
      };
    }
    NProgress.start();
    store.commit("loading", true);
    return config;
  },
  error => {
    NProgress.done();
    store.commit("loading", false);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    NProgress.done();
    store.commit("loading", false);
    return response;
  },
  error => {
    NProgress.done();
    store.commit("loading", false);
    if (error.response) {
      if ([401, 403].includes(error.response.status)) {
        store.dispatch("auth/logout");
      }
      return error.response;
    }
    return Promise.reject(error);
  }
);

export default instance;
