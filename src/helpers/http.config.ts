import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { authHeader } from "./auth-header";
import router from "../router";
import { useUserStore } from "../stores/user";
const baseUrl = process.env.VUE_APP_ROOT_URL; // "http://localhost:8811/api"; //local-test

const Api_Path = `${baseUrl}/`;

const httpConfig: AxiosInstance = axios.create({
  baseURL: Api_Path,
  headers: {
    "Content-Type": "application/json",
  },
});

httpConfig.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
httpConfig.defaults.headers.post["Access-Control-Allow-Methods"] = "*";
httpConfig.defaults.headers.post["Access-Control-Allow-Headers"] = "*";
httpConfig.defaults.headers.post["Cache-Control"] = "no-cache";
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers["Authorization"] = authHeader();
  return config;
};

httpConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response);
    // handleNewVersion();
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      console.log(error);
      console.log(router);
      // router().replace({ name: 'login' });
      useUserStore().$reset();
      // localStorage.clear();
      router.push({ path: "/login" });
      // useUserStore().routeLogin();
      // router.push('/login');

      // router.push({ path: '/login', name: 'login' }).then(() => {
      //   console.log('afasdf');
      // });
      // redirect('/login');
    }
    console.log(error);

    return Promise.reject(error);
  }
);
httpConfig.interceptors.request.use(authInterceptor);

export default httpConfig;
