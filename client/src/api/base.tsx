import { logoutUser } from '@redux/slices/userSlice';
import { store } from '@redux/store';
import axios, { AxiosRequestConfig } from 'axios';
export const client = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
})

export const AxiosAPI = axios.create({})

AxiosAPI.interceptors.request.use(
  (config:AxiosRequestConfig)=> {
    const token =  store.getState().user.currentUser.accessToken;
    config.headers =  {
      Authorization: `Bearer ${token}`,
    }
    return config
  } , 
  error => {
  });

  AxiosAPI.interceptors.response.use(
    response => response,
  async(error) => {
     if (error?.response?.status === 401) {
      
 store.dispatch(logoutUser());
  }});

 

  // const refreshToken = async () => {
  //   try {
  //     const token =  store.getState().user.currentUser.refreshToken;
  
  //     const {data}:any =  await client.post("/auth/refresh", { token: token });
  //     return data
  //   } catch (err) {
  //   }
  // };

