import { useAuthStore } from "@/stores/authStore";
import {
  AuthResponse,
  LoginRequest,
  SendVerifyEmailRequest,
  SendVerifyEmailResponse,
  SignupRequest,
  User,
  VerifyCodeRequest,
} from "@/types/auth";
import { HttpRedirectResponse } from "@/types/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "./axios.service";

export const authService = {
  getCurrentUser: async () => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },

  login: async (credentials: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    if (response.data.status === "success") {
      const { accessToken, refreshToken, data: user } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      useAuthStore.getState().setUser(user);
    }

    return response.data;
  },

  signup: async (userData: SignupRequest) => {
    const response = await apiClient.post<HttpRedirectResponse>(
      "/auth/signup",
      userData
    );

    return response.data;
  },

  SendVerifyEmail: async (credentials: SendVerifyEmailRequest) => {
    const response = await apiClient.post<SendVerifyEmailResponse>(
      "/auth/send-verification",
      credentials
    );

    return response.data;
  },

  verifyCode: async (data: VerifyCodeRequest) => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/verify-email",
      data
    );

    if (response.data.status === "success") {
      const { accessToken, refreshToken, data: user } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      useAuthStore.getState().setUser(user);
    }

    return response.data;
  },

  logout: async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    useAuthStore.getState().clearAuth();
  },
};
