import { authService } from "@/services/auth.service";
import {
  LoginRequest,
  OAuthGoogleRequest,
  SendVerifyEmailRequest,
  SignupRequest,
  VerifyCodeRequest,
} from "@/types/auth";
import { AppError } from "@/types/error";
import { clearTokens, saveTokens } from "@/utils/tokenStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCurrentUser, userKeys } from "./useUser";

export const useAuth = () => {
  const { data: user, isLoading, isError, refetch, error } = useCurrentUser();
  return {
    user,
    isAuthenticated: !!user && !isError,
    isLoading, // true only on first load (not background load(isFetching))
    isInitialized: !isLoading, // Initialized when not loading
    error,
    refetch, // Manual refresh
  };
};

/** MUTATIONS (login/signup & emails) */

export function useGoogleOAuth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: OAuthGoogleRequest) => authService.googleOAuth(body),
    onSuccess: async function ({ accessToken, refreshToken, data: user }) {
      await saveTokens(accessToken, refreshToken);
      await queryClient.setQueryData(userKeys.current(), user);
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: LoginRequest) => authService.login(userData),
    onSuccess: async function ({ accessToken, refreshToken, data: user }) {
      await saveTokens(accessToken, refreshToken);
      queryClient.setQueryData(userKeys.current(), user);
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signup(userData),
    onError: (error: AppError) => {
      return error;
    },
    // onSuccess: () => {
    //   /** API returns 307 which handled automatically */
    //   // router.replace("/send-verification");
    // },
  });
}

export function useSendVerifyEmail() {
  return useMutation({
    mutationFn: (userData: SendVerifyEmailRequest) =>
      authService.SendVerifyEmail(userData),
    onSuccess: (data) => {
      router.push({
        pathname: "/verify-code",
        params: {
          email: data.data.email,
          expires: data.data.expires,
          message: data.message,
        },
      });
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}

export function useReSendVerifyEmail() {
  return useMutation({
    mutationFn: (userData: SendVerifyEmailRequest) =>
      authService.SendVerifyEmail(userData),
    onError: (error: AppError) => {
      return error;
    },
  });
}

export function useVerifyCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: VerifyCodeRequest) =>
      authService.verifyCode(userData),
    onSuccess: async function ({ accessToken, refreshToken, data: user }) {
      await saveTokens(accessToken, refreshToken);
      queryClient.setQueryData(userKeys.current(), user);
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await clearTokens();
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/login");
    },
  });
}
