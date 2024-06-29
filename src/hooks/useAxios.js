import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    //Request interceptor____________

    const requestInterceptors = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //Response interceptor____________

    const responseInterceptors = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // eslint-disable-next-line no-useless-catch
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;
            setAuth({ ...auth, authToken: token });

            console.log(`NEW TOKEN ${token}`);
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return originalRequest;
          } catch (err) {
            throw err;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptors);
      api.interceptors.request.eject(responseInterceptors);
    };
  }, [auth, setAuth]);
  return { api };
};

export default useAxios;
