import AuthLayout from "@/app/(auth)/_layout";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { refetch, isInitialized, isLoading, isAuthenticated, user } =
    useAuth();

  useEffect(() => {
    if (!isInitialized) {
      void refetch();
    }
  }, [isInitialized, refetch]);

  if (!isInitialized || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(
    `isAuthenticated ${isAuthenticated}, user: ${JSON.stringify(user || {})}`
  );

  if (!isAuthenticated) {
    return <AuthLayout />;
  }

  return <>{children}</>;
};
