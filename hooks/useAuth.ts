import { authService } from "@/services/auth.service";
import { LoginRequest, SignupRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.clear();
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: SignupRequest) => authService.signup(userData),
    onSuccess: (data) => {
      queryClient.clear();
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};
