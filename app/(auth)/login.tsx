import { Revenue4 } from "@/assets/images";
import { styles } from "@/assets/styles/auth.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormField } from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import GoogleOAuthBtn from "@/components/OAuthGoogleBtn";
import { COLORS } from "@/constants/theme";
import {
  useButtonPress,
  useFadeIn,
  useSlideInFromY,
  useSlideUpFadeIn,
} from "@/hooks/useAnimation";
import { useLogin } from "@/hooks/useAuth";
import { LoginRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { loginSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const imageAnim = useSlideUpFadeIn(600, 0);
  const titleAnim = useSlideInFromY(500, 600, false);
  const formAnim = useSlideInFromY(500, 800, true);
  const buttonAnim = useSlideInFromY(500, 1000, true);
  const googleButtonAnim = useFadeIn(500, 1200);
  const footerAnim = useSlideUpFadeIn(600, 1500, 50);
  const buttonPress = useButtonPress();

  const [apiError, setApiError] = useState<AppError | null>(null);
  const { isPending: isLoading, mutateAsync } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data: LoginRequest) {
    setApiError(null);
    try {
      await mutateAsync(data);
    } catch (err) {
      setApiError(err as AppError);
    }
  }

  function dismissError() {
    setApiError(null);
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={false}
    >
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: imageAnim.opacity,
            transform: [{ translateY: imageAnim.translateY }],
          }}
        >
          <Image source={Revenue4} style={styles.img} />
        </Animated.View>
        <Animated.View style={{ opacity: titleAnim.opacity }}>
          <Text style={styles.title}>Welcome Back</Text>
        </Animated.View>

        {apiError && (
          <ErrorAlert
            error={apiError}
            onDismiss={dismissError}
            showRetry={true}
          />
        )}

        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: formAnim.opacity,
            },
          ]}
        >
          <FormField
            control={control}
            name="email"
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
          />
          <FormField
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            error={errors.password}
            editable={!isLoading}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim.opacity,
              transform: [{ scale: buttonPress.scale }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              (isLoading || !isValid) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || !isValid}
            onPressIn={buttonPress.onPressIn}
            onPressOut={buttonPress.onPressOut}
          >
            {isLoading && <LoadingSpinner size="small" color={COLORS.white} />}
            <Text style={styles.buttonText}>
              {isLoading ? "Signing In" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: googleButtonAnim,
            },
          ]}
        >
          <GoogleOAuthBtn
            onError={() => {
              console.log("onError");
            }}
            disabled={isLoading}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.footerContainer,
            {
              opacity: footerAnim.opacity,
              transform: [{ translateY: footerAnim.translateY }],
            },
          ]}
        >
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/signup" asChild>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}
