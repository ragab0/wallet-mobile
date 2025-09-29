import AuthLayout from "@/app/(auth)/_layout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: props) {
  const { refetch, isInitialized, isLoading, isAuthenticated, user } =
    useAuth();

  useEffect(() => {
    if (!isInitialized) {
      void refetch();
    }
  }, [isInitialized, refetch]);

  if (!isInitialized || isLoading) {
    return <LoadingSpinner size="large" isFull={true} />;
  }

  console.log(
    `isAuthenticated ${isAuthenticated}, user: ${JSON.stringify(user || {})}`
  );

  if (!isAuthenticated) {
    return <AuthLayout />;
  }

  return <>{children}</>;
}
