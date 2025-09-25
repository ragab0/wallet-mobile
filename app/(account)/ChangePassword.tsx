import { createGlobalStyles } from "@/assets/styles/globals.styles";
import { createPasswordStyles } from "@/assets/styles/password.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import KeyboardLayout from "@/components/KeyboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import PasswordField from "@/components/PasswordField";
import { SuccessAlert } from "@/components/SuccessAlert";
import { useChangePassword } from "@/hooks/useUser";
import { useThemeColors } from "@/stores/themeStore";
import { ChangePasswordData } from "@/types/user";
import { passwordSchema } from "@/validations/account.validation";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ChangePasswordScreen() {
  const COLORS = useThemeColors();
  const styles = createPasswordStyles(COLORS);
  const globals = createGlobalStyles(COLORS);

  const navigation = useNavigation();
  const changePasswordMutation = useChangePassword();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ChangePasswordData) {
    try {
      setError(null);
      await changePasswordMutation.mutateAsync(data);
      setSuccessMessage("Password changed successfully!");
      reset();
      setTimeout(() => {
        setSuccessMessage(null);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      setError(error);
    }
  }

  const newPassword = watch("newPassword");

  return (
    <KeyboardLayout>
      <ScrollView
        style={globals.container}
        showsVerticalScrollIndicator={false}
      >
        {successMessage && (
          <SuccessAlert
            message={successMessage}
            onDismiss={() => setSuccessMessage(null)}
          />
        )}
        {error && (
          <ErrorAlert
            error={error}
            onRetry={() => setError(null)}
            onDismiss={() => setError(null)}
            showRetry={false}
          />
        )}

        {/* Header */}
        <View style={styles.passwordHeader}>
          <Ionicons name="shield-checkmark-outline" size={48} color="#8B593E" />
          <Text style={styles.passwordTitle}>Change Password</Text>
          <Text style={styles.passwordSubtitle}>
            Choose a strong password to keep your account secure
          </Text>
        </View>

        {/* Form Section */}
        <View style={[globals.card, globals.groups]}>
          {/* Current Password */}
          <View>
            <Text style={globals.inputLabel}>Current Password</Text>
            <PasswordField
              control={control}
              name="currentPassword"
              placeholder="Enter your current password"
              error={errors.currentPassword}
            />
          </View>
          {/* New Password */}
          <View>
            <Text style={globals.inputLabel}>New Password</Text>
            <PasswordField
              control={control}
              name="newPassword"
              placeholder="Enter your new password"
              error={errors.newPassword}
              showStrengthIndicator={true}
            />
          </View>
          {/* Confirm Password */}
          <View>
            <Text style={globals.inputLabel}>Confirm New Password</Text>
            <PasswordField
              control={control}
              name="confirmPassword"
              placeholder="Confirm your new password"
              error={errors.confirmPassword}
            />
          </View>

          {/* Password Requirements */}
          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <View style={{ gap: 8 }}>
              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    newPassword?.length >= 6
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={newPassword?.length >= 6 ? "#10B981" : "#9A8478"}
                />
                <Text
                  style={[
                    styles.requirementText,
                    newPassword?.length >= 6 && styles.requirementMet,
                  ]}
                >
                  At least 6 characters
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    /[a-z]/.test(newPassword || "")
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={
                    /[a-z]/.test(newPassword || "") ? "#10B981" : "#9A8478"
                  }
                />
                <Text
                  style={[
                    styles.requirementText,
                    /[a-z]/.test(newPassword || "") && styles.requirementMet,
                  ]}
                >
                  One lowercase letter
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    /[A-Z]/.test(newPassword || "")
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={
                    /[A-Z]/.test(newPassword || "") ? "#10B981" : "#9A8478"
                  }
                />
                <Text
                  style={[
                    styles.requirementText,
                    /[A-Z]/.test(newPassword || "") && styles.requirementMet,
                  ]}
                >
                  One uppercase letter
                </Text>
              </View>

              <View style={styles.requirementItem}>
                <Ionicons
                  name={
                    /\d/.test(newPassword || "")
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={16}
                  color={/\d/.test(newPassword || "") ? "#10B981" : "#9A8478"}
                />
                <Text
                  style={[
                    styles.requirementText,
                    /\d/.test(newPassword || "") && styles.requirementMet,
                  ]}
                >
                  One number
                </Text>
              </View>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            style={[
              styles.changePasswordButton,
              (!isValid || changePasswordMutation.isPending) &&
                globals.disabledButton,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending ? (
              <LoadingSpinner size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.changePasswordButtonText}>
                  Change Password
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardLayout>
  );
}
