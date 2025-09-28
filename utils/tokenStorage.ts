import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function saveTokens(accessToken: string, refreshToken: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("accessToken", accessToken);
  }
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
}

export async function getAccessToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem("accessToken");
  }
  return await SecureStore.getItemAsync("accessToken");
}

export async function getRefreshToken() {
  if (Platform.OS === "web") return " ";
  return await SecureStore.getItemAsync("refreshToken");
}

export async function clearTokens() {
  if (Platform.OS === "web") {
    localStorage.removeItem("accessToken");
  }
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
}
