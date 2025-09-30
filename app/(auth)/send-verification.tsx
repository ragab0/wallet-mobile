import { styles } from "@/assets/styles/auth.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormField } from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import { COLORS } from "@/constants/theme";
import { useSendVerifyEmail } from "@/hooks/useAuth";
import { SendVerifyEmailRequest } from "@/types/auth";
import { sendVerifyEmailSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function VerifyEmail() {
  const { message, payload } = useLocalSearchParams();
  const email = JSON.parse((payload as string) || "{}").email;
  const [isRedirectError, setIsRedirectError] = useState(!!message?.length);
  const {
    isPending: isLoading,
    mutate,
    error: apiError,
  } = useSendVerifyEmail();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendVerifyEmailRequest>({
    resolver: yupResolver(sendVerifyEmailSchema),
    defaultValues: {
      email: email || "",
    },
  });

  async function onSubmit(data: SendVerifyEmailRequest) {
    mutate(data);
  }

  function dismissRedirectError() {
    setIsRedirectError(false);
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Verify-Email</Text>
        {isRedirectError && (
          <ErrorAlert
            error={{
              message: message as string,
              type: "REDIRECT_ERROR",
              details: "",
            }}
            onDismiss={dismissRedirectError}
            showRetry={false}
          />
        )}

        {apiError && <ErrorAlert error={apiError} />}

        <View style={styles.formContainer}>
          <FormField
            control={control}
            name="email"
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
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
          {isLoading && <LoadingSpinner size="small" color={COLORS.white} />}
          <Text style={styles.buttonText}>
            {isLoading ? "Getting Code..." : "Get Code"}
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
