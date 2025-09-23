import { AppError, FailedError } from "@/types/error";
import { ErrorHandler } from "@/utils/errorHandler";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "@/utils/tokenStorage";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

/* 01) axios instances for both (api calling & refresh token) */

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
});

const refreshClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
});

/* 02) Track ongoing refresh attempts to prevent multiple simultaneous refreshes */

let isRefreshing = false;
let failedQueue: FailedError[] = [];
const processQueue = (error: AppError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

/* 03) api calling req/res itnerceptors */

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    console.log(
      `Request interceptor: token is > ${token ? "Present" : "Missing"}`
    );
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(ErrorHandler.handleError(error));
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.config.url);
    console.dir(response);
    return response;
  },
  async (error: AxiosError): Promise<never> => {
    console.error("Response error:", error.response?.status, error.config?.url);
    console.dir(error);
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If refresh is in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err: AppError) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available TO REQ REFRESH");
        }
        console.log("Attempting token refresh...");
        const refreshResponse = await refreshClient.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (refreshResponse.data?.accessToken) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            refreshResponse.data;
          await saveTokens(newAccessToken, newRefreshToken);

          // Process queued requests
          processQueue(null, newAccessToken);
          // Retry original request
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          throw new Error("Invalid refresh response");
        }
      } catch (refreshError) {
        console.warn("Token refresh failed:", refreshError);
        await clearTokens();
        const authError: AppError = {
          type: "AUTHENTICATION_ERROR",
          message: "Session expired",
          details: "Please log in again.",
          statusCode: 401,
          retryable: false,
        };
        processQueue(authError);
        return Promise.reject(authError);
      } finally {
        isRefreshing = false;
      }
    }

    const appError = await ErrorHandler.handleError(error);
    return Promise.reject(appError);
  }
);
