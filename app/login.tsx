import { Revenue4 } from "@/assets/images";
import { styles } from "@/assets/styles/auth.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { COLORS } from "@/constants/theme";
import { useLogin } from "@/hooks/useAuth";
import { LoginRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { loginSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
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

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              placeholder="Enter email"
              placeholderTextColor={COLORS.textLight}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!isLoading}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={value}
              placeholder="Enter password"
              placeholderTextColor={COLORS.textLight}
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!isLoading}
            />
          )}
        />

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
