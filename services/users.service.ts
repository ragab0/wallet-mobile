import { apiClient } from "@/configs/apiClient";
import { User } from "@/types/auth";

export const usersService = {
  getCurrentUser: async function () {
    const response = await apiClient.get<User>("/users/me");
    return response.data;
  },
};
