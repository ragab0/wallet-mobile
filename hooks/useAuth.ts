import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import {
  LoginRequest,
  SendVerifyEmailRequest,
  SignupRequest,
  VerifyCodeRequest,
} from "@/types/auth";
import { AppError } from "@/types/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

/** QUERIES */

export const useAuth = () => {
  const as = useAuthStore();
  return {
    user: as.user,
    isAuthenticated: as.isAuthenticated,
    isLoading: as.isLoading,
    isInitialized: as.isInitialized,
    updateUser: as.updateUser,
    getCurrentUser: as.getCurrentUser,
    initializeAuth: as.initializeAuth,
  };
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated, // Only when authenticated
    retry: 1, // Only retry once on failure
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/** MUTATIONS (login/signup & emails) */

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: LoginRequest) => authService.login(userData),
    onSuccess: () => {
      queryClient.clear();
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signup(userData),
    onSuccess: () => {
      queryClient.clear();
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}

export function useSendVerifyEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: SendVerifyEmailRequest) =>
      authService.SendVerifyEmail(userData),
    onSuccess: (data) => {
      queryClient.clear();
      router.replace({
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: SendVerifyEmailRequest) =>
      authService.SendVerifyEmail(userData),
    onSuccess: (data) => {
      queryClient.clear();
    },
    onError: (error: AppError) => {
      return error;
    },
  });
}

export const useVerifyCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: VerifyCodeRequest) =>
      authService.verifyCode(userData),
    onSuccess: (data) => {
      queryClient.clear();
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};
