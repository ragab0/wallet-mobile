import { apiClient } from "@/services/axios.service";
import { User } from "@/types/auth";
import { AuthState } from "@/types/stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,

  // # after successful login
  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },
  updateUser: (userData) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...userData },
      });
    }
  },
  clearAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  setInitialized: (initialized) => {
    set({ isInitialized: initialized });
  },

  // from API
  getCurrentUser: async () => {
    try {
      set({ isLoading: true });
      const response = await apiClient.get("/auth/me");
      if (response.data && response.data.status === "success") {
        set({
          user: response.data.data,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("FORM AUTH_STORE - getCurrentUser:", error);
      // Token invalid ? clear
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  // on app start
  initializeAuth: async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        await get().getCurrentUser();
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error("FROM AUTH_STPRE - initializeAuth:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
      });
    }
  },
}));
