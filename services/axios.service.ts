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
    console.error(error.response?.data);
    const appError = await ErrorHandler.handleError(error);
    console.error(appError);
    return Promise.reject(appError);
  }
);
