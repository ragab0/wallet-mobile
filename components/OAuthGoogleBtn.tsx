import { styles as authStyles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { useGoogleOAuth } from "@/hooks/useAuth";
import { AppError } from "@/types/error";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();
const ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB || "";
const SCHEME = process.env.EXPO_PUBLIC_APP_SCHEME || undefined;
const redirectUri = AuthSession.makeRedirectUri({
  scheme: SCHEME,
  path: "/",
});
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

interface props {
  onError: (error: AppError) => void;
  disabled: boolean;
}

export default function GoogleLoginButton({
  onError,
  disabled = false,
}: props) {
  const { mutate, isPending } = useGoogleOAuth();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: ID,
      scopes: ["openid", "profile", "email"],
      redirectUri,
      usePKCE: true,
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        access_type: "offline",
      },
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success" && request?.codeVerifier) {
      console.log("response is:", response);
      console.log("code verifier is:", request.codeVerifier);
      try {
        mutate({
          code: response.params.code,
          redirectUri,
          codeVerifier: request.codeVerifier,
        });
      } catch (_) {
        onError({
          message: "Google authentication failed",
          code: "GOOGLE_AUTH_ERROR",
        } as unknown as AppError);
      }
    } else if (response?.type === "error") {
      onError({
        message: "Google authentication failed",
        code: "GOOGLE_AUTH_ERROR",
      } as unknown as AppError);
    }
  }, [response, mutate, onError]);

  async function handleGoogleLogin() {
    try {
      await promptAsync();
    } catch (_) {
      onError({
        message: "Failed to start Google authentication",
        code: "GOOGLE_AUTH_START_ERROR",
      } as unknown as AppError);
    }
  }

  const buttonDisabled = disabled || isPending || !request;

  return (
    <>
      <View style={authStyles.divider}>
        <View style={authStyles.dividerLine} />
        <Text style={authStyles.dividerText}>or</Text>
        <View style={authStyles.dividerLine} />
      </View>

      <TouchableOpacity
        style={[
          styles.googleButton,
          buttonDisabled && authStyles.buttonDisabled,
        ]}
        onPress={handleGoogleLogin}
        disabled={buttonDisabled}
      >
        {isPending ? (
          <ActivityIndicator color={COLORS.text} size="small" />
        ) : (
          <>
            <Ionicons name="logo-google" size={20} color={COLORS.text} />
            <Text style={[authStyles.buttonText, { color: COLORS.text }]}>
              Continue with Google
            </Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
  },
});
