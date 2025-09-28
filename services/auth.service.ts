import {
  AuthResponse,
  LoginRequest,
  OAuthGoogleRequest,
  SendVerifyEmailRequest,
  SendVerifyEmailResponse,
  SignupRequest,
  VerifyCodeRequest,
} from "@/types/auth";
import { HttpRedirectResponse } from "@/types/globals";
import { clearTokens } from "@/utils/tokenStorage";
import { apiClient } from "../configs/apiClient";

export const authService = {
  googleOAuth: async function (body: OAuthGoogleRequest) {
    const response = await apiClient.post<AuthResponse>(
      "/auth/google/mobile",
      body
    );
    return response.data;
  },

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

  logout: async function () {
    await apiClient.delete("/auth/logout");
    void clearTokens();
  },
};
