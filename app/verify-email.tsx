import { ErrorAlert } from "@/components/ErrorAlert";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function VerifyEmail() {
  const { message } = useLocalSearchParams();
  const [isRedirectError, setIsRedirectError] = useState(!!message.length);

  function dismissRedirectError() {
    setIsRedirectError(false);
  }

  return (
    <View>
      <Text>verify-email</Text>
      {isRedirectError && (
        <ErrorAlert
          error={{
            message: message as string,
            type: "REDIRECT_ERROR",
            details: "",
          }}
          onDismiss={dismissRedirectError}
          showRetry={true}
        />
      )}
    </View>
  );
}
