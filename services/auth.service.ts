import {
  AuthResponse,
  LoginRequest,
  SendVerifyEmailRequest,
  SendVerifyEmailResponse,
  SignupRequest,
  VerifyCodeRequest,
} from "@/types/auth";
import { HttpRedirectResponse } from "@/types/http";
import { apiClient } from "../configs/apiClient";

export const authService = {
  getCurrentUser: async () => {
    const response = await apiClient.get<AuthResponse>("/auth/me");
    return response.data;
  },

  login: async (credentials: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
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
    return response.data;
  },
};
