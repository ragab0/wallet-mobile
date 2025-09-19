import { useAuthStore } from "@/stores/authStore";
import { ErrorHandler } from "@/utils/errorHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";

// create an axios instance & req/res interceptors;

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000, // 15 sec;
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as any;
    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
          // Use apiClient for refresh instead of fetch
          const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );
          if (response.data && response.data.accessToken) {
            const newAccessToken = response.data.accessToken;
            // Update AsyncStorage
            await AsyncStorage.setItem("accessToken", newAccessToken);
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
      // Refresh failed or no refresh token, logout user
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
      useAuthStore.getState().clearAuth();
      // You might want to redirect to login here
      // router.replace('/login');
    }

    /** */

    const appError = await ErrorHandler.handleError(error);
    return Promise.reject(appError);
  }
);
