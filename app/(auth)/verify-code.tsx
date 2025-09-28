import { styles } from "@/assets/styles/auth.styles";
import { CodeInput } from "@/components/CodeInput";
import { ErrorAlert } from "@/components/ErrorAlert";
import { SuccessAlert } from "@/components/SuccessAlert";
import { useReSendVerifyEmail, useVerifyCode } from "@/hooks/useAuth";
import { VerifyCodeRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { verifyCodeSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function VerifyCode() {
  const verifyMutation = useVerifyCode();
  const resendMutation = useReSendVerifyEmail();
  const { email, message } = useLocalSearchParams();
  const [successMessage, setSuccessMessage] = useState(
    (message as string) || ""
  );
  const [apiError, setApiError] = useState<AppError | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<VerifyCodeRequest>({
    resolver: yupResolver(verifyCodeSchema),
    defaultValues: {
      email: (email as string) || "",
      code: "",
    },
  });

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  async function onSubmit(data: VerifyCodeRequest) {
    setApiError(null);
    setSuccessMessage("");
    try {
      await verifyMutation.mutateAsync(data);
    } catch (err) {
      setApiError(err as AppError);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0 || !email) return;
    setApiError(null);
    setSuccessMessage("");
    try {
      await resendMutation.mutateAsync({ email: email as string });
      setSuccessMessage("Verification code sent again!");
      setResendCooldown(60);
      setValue("code", "");
    } catch (err) {
      setApiError(err as AppError);
    }
  }

  function dismissError() {
    setApiError(null);
  }

  function dismissSuccess() {
    setSuccessMessage("");
  }

  // no email ? Redirect
  if (!email) {
    Alert.alert("Error", "No email provided", [
      { text: "OK", onPress: () => router.replace("/send-verification") },
    ]);
    return null;
  }

  const hasFormErrors = Object.keys(errors).length > 0;
  const isVerifying = verifyMutation.isPending;
  const isResending = resendMutation.isPending;
  const canResend = resendCooldown === 0 && !isResending && !isVerifying;
  const isLoading = isVerifying || isResending;

  console.log(message);
  console.log("1111111111111323242");

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        {/* Success Message */}
        {successMessage && !apiError && (
          <SuccessAlert message={successMessage} onDismiss={dismissSuccess} />
        )}

        {/* API Error */}
        {apiError && (
          <ErrorAlert
            error={apiError}
            onRetry={
              apiError.retryable ? () => handleSubmit(onSubmit)() : undefined
            }
            onDismiss={dismissError}
            showRetry={true}
          />
        )}

        {/* Form Validation Error */}
        {hasFormErrors && !apiError && (
          <ErrorAlert
            error={{
              type: "VALIDATION_ERROR" as any,
              message: "Invalid verification code",
              details: errors.code?.message || "",
              retryable: false,
            }}
            onDismiss={() => {}}
            showRetry={false}
          />
        )}

        {/* codes */}
        <View style={styles.codeContainer}>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <CodeInput
                value={value}
                onChangeText={onChange}
                error={!!errors.code}
                editable={!isLoading}
              />
            )}
          />
        </View>

        {/* submit btn */}
        <TouchableOpacity
          style={[
            styles.button,
            (isLoading || !isValid) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || !isValid}
        >
          <Text style={styles.buttonText}>
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Text>
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn&apos;t receive the code?</Text>
          <TouchableOpacity
            onPress={handleResend}
            disabled={!canResend}
            style={styles.resendButton}
          >
            <Text
              style={[
                styles.resendButtonText,
                !canResend && styles.resendButtonDisabled,
              ]}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : isResending
                ? "Sending..."
                : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* change email */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Wrong email address?</Text>
          <Link href="/send-verification" asChild>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.linkText}>Change email</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
