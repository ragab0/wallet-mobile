import { authService } from "@/services/auth.service";
import {
  LoginRequest,
  SendVerifyEmailRequest,
  SignupRequest,
  VerifyCodeRequest,
} from "@/types/auth";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

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
