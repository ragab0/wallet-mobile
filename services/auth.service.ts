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
  login: async function (credentials: LoginRequest) {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  signup: async function (userData: SignupRequest) {
    const response = await apiClient.post<HttpRedirectResponse>(
      "/auth/signup",
      userData
    );
    return response.data;
  },

  SendVerifyEmail: async function (credentials: SendVerifyEmailRequest) {
    const response = await apiClient.post<SendVerifyEmailResponse>(
      "/auth/send-verification",
      credentials
    );
    return response.data;
  },

  verifyCode: async function (data: VerifyCodeRequest) {
    const response = await apiClient.post<AuthResponse>(
      "/auth/verify-email",
      data
    );
    return response.data;
  },
};
