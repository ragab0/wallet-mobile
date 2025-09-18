import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "./axios.service";

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    if (response.data.status === "success") {
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/signup",
      userData
    );

    if (response.data.status === "success") {
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
    }

    return response.data;
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
  },
};
