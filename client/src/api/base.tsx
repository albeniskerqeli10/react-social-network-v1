import { logoutUser } from "../redux/slices/userSlice";
import { store } from "../redux/store";
import axios, { AxiosRequestConfig } from "axios";
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    mode: "cors",
  },
});

export const AxiosAPI = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    mode: "cors",
  },
});

AxiosAPI.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getState().user.currentUser.accessToken;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {}
);

AxiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(logoutUser());
    }
  }
);

// const refreshToken = async () => {
//   try {
//     const token =  store.getState().user.currentUser.refreshToken;

//     const {data}:any =  await client.post("/auth/refresh", { token: token });
//     return data
//   } catch (err) {
//   }
// };
