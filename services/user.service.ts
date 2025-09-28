import { apiClient } from "@/configs/apiClient";
import { ChangePasswordData, UpdateUserData, User } from "@/types/user";

export const usersService = {
  getCurrentUser: async function () {
    const response = await apiClient.get<User>("/users/me");
    return response.data;
  },

  updateProfile: async function (data: UpdateUserData) {
    const response = await apiClient.patch<User>("/users/me", data);
    return response.data;
  },

  changePassword: async function (data: ChangePasswordData) {
    const response = await apiClient.patch("/users/me/password", data);
    return response.data;
  },

  uploadPicture: async function (formData: FormData) {
    const response = await apiClient.post<User>("/users/me/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  // uploadAvatar: async function (formData: FormData) {
  //   const response = await apiClient.delete("/users/me/picture", formData);
  //   return response.data;
  // },

  deleteAccount: async function () {
    const response = await apiClient.delete("/users/me");
    return response.data;
  },
};
