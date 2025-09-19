import { Revenue4 } from "@/assets/images";
import { styles } from "@/assets/styles/auth.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormField } from "@/components/FormField";
import { useLogin } from "@/hooks/useAuth";
import { LoginRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { loginSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
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
        <Image source={Revenue4} style={styles.img} />
        <Text style={styles.title}>Welcome Back</Text>

        {apiError && (
          <ErrorAlert
            error={apiError}
            onDismiss={dismissError}
            showRetry={true}
          />
        )}

        <View style={[styles.formContainer]}>
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
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            (isLoading || !isValid) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || !isValid}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/signup" asChild>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
