import { Revenue2 } from "@/assets/images";
import { styles } from "@/assets/styles/auth.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormField } from "@/components/FormField";
import GoogleLoginButton from "@/components/OAuthGoogleBtn";
import { useSignup } from "@/hooks/useAuth";
import { SignupRequest } from "@/types/auth";
import { AppError } from "@/types/error";
import { signupSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup() {
  const [apiError, setApiError] = useState<AppError | null>(null);
  const { isPending: isLoading, mutateAsync } = useSignup();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupRequest>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  async function onSubmit(data: SignupRequest) {
    setApiError(null);
    try {
      await mutateAsync(data);
    } catch (error: any) {
      setApiError(error as AppError);
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
        <Image source={Revenue2} style={styles.img} />
        <Text style={styles.title}>Create Account</Text>

        {apiError && (
          <ErrorAlert
            error={apiError}
            onDismiss={dismissError}
            showRetry={true}
          />
        )}

        <View style={styles.formContainer}>
          <FormField
            control={control}
            name="fname"
            placeholder="First Name"
            autoCapitalize="words"
            error={errors.fname}
            editable={!isLoading}
          />
          <FormField
            control={control}
            name="lname"
            placeholder="Last Name"
            autoCapitalize="words"
            error={errors.lname}
            editable={!isLoading}
          />
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
          <FormField
            control={control}
            name="passwordConfirm"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            error={errors.passwordConfirm}
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <GoogleLoginButton
          onError={() => {
            console.log("onError");
          }}
          disabled={isLoading}
        />

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.linkText}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
