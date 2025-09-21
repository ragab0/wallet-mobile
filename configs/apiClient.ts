import { ErrorHandler } from "@/utils/errorHandler";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "@/utils/tokenStorage";
import axios, { AxiosError } from "axios";

/* create an axios instance & req/res interceptors; */

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    console.log(`request token: ${token}`);
    console.dir(config);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("response dir:");
    console.dir(response);
    return response;
  },
  async (error: AxiosError): Promise<never> => {
    console.log("response error dir:");
    console.dir(error);
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
          // using separate instance:
          const refreshResponse = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );
          if (refreshResponse.data && refreshResponse.data.accessToken) {
            const { accessToken: newAt, refreshToken: newRt } =
              refreshResponse.data;
            await saveTokens(newAt, newRt || refreshToken);

            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${newAt}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
      // failed ?
      await clearTokens();
    }

    const appError = await ErrorHandler.handleError(error);
    return Promise.reject(appError);
  }
);
