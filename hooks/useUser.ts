import { usersService } from "@/services/user.service";
import { AppError } from "@/types/error";
import { ChangePasswordData, UpdateUserData, User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query Keys
export const userKeys = {
  all: ["users"] as const,
  current: () => [...userKeys.all, "current"] as const,
};

/** Quiries */

export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: usersService.getCurrentUser,
    staleTime: Infinity,
    retry: 1,
    enabled: true,
  });
}

/** Mutations */

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserData) => usersService.updateProfile(data),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(userKeys.current(), updatedUser);
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => usersService.changePassword(data),
    onError: (error: AppError) => {
      return error;
    },
  });
};

export const useUploadPicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => usersService.uploadPicture(formData),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(userKeys.current(), updatedUser);
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.deleteAccount,
    onSuccess: () => {
      queryClient.clear();
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};
