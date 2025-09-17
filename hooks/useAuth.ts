import { authService } from "@/services/auth.service";
import { LoginRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      router.replace("/(tabs)");
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};
