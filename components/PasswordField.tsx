import { styles as authStyles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface props {
  control: Control<any>;
  name: string;
  placeholder: string;
  error?: FieldError;
  editable?: boolean;
  inputStyle?: any;
  saveErrorSpace?: boolean;
  showStrengthIndicator?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function PasswordField({
  control,
  name,
  placeholder,
  error,
  editable = true,
  inputStyle,
  saveErrorSpace = true,
  showStrengthIndicator = false,
  autoCapitalize = "none",
}: props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function getPasswordStrength(password: string) {
    if (!password || !showStrengthIndicator)
      return { strength: 0, text: "", color: COLORS.textLight };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

    const strengthMap = {
      0: { text: "Very Weak", color: "#EF4444" },
      1: { text: "Very Weak", color: "#EF4444" },
      2: { text: "Weak", color: "#F59E0B" },
      3: { text: "Fair", color: "#F59E0B" },
      4: { text: "Good", color: "#10B981" },
      5: { text: "Strong", color: "#10B981" },
      6: { text: "Very Strong", color: "#059669" },
    };

    return {
      strength: (strength / 6) * 100,
      text: strengthMap[strength as keyof typeof strengthMap].text,
      color: strengthMap[strength as keyof typeof strengthMap].color,
    };
  }

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          const passwordStrength = getPasswordStrength(value);
          return (
            <>
              <View style={passwordStyles.inputContainer}>
                <TextInput
                  style={[
                    inputStyle || authStyles.input,
                    error && authStyles.inputError,
                    passwordStyles.passwordInput,
                  ]}
                  value={value}
                  placeholder={placeholder}
                  placeholderTextColor={COLORS.textLight}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!isPasswordVisible}
                  keyboardType="default"
                  autoCapitalize={autoCapitalize}
                  editable={editable}
                  autoCorrect={false}
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={passwordStyles.eyeButton}
                  onPress={togglePasswordVisibility}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.textLight}
                  />
                </TouchableOpacity>
              </View>

              {/* Password Strength Indicator */}
              {showStrengthIndicator && value && (
                <View style={passwordStyles.strengthContainer}>
                  <View style={passwordStyles.strengthBar}>
                    <View
                      style={[
                        passwordStyles.strengthFill,
                        {
                          width: `${passwordStrength.strength}%`,
                          backgroundColor: passwordStrength.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      passwordStyles.strengthText,
                      { color: passwordStrength.color },
                    ]}
                  >
                    {passwordStrength.text}
                  </Text>
                </View>
              )}
            </>
          );
        }}
      />

      {/* Error Message */}
      {saveErrorSpace && (
        <Text style={authStyles.textError}>{error ? error.message : " "}</Text>
      )}
    </View>
  );
}

const passwordStyles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    paddingRight: 50, // Make space for the eye icon
  },

  eyeButton: {
    position: "absolute",
    right: 16,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  strengthContainer: {
    marginTop: 8,
    marginBottom: 4,
  },

  strengthBar: {
    height: 4,
    backgroundColor: "#E5D3B7",
    borderRadius: 2,
    overflow: "hidden",
  },

  strengthFill: {
    height: "100%",
    borderRadius: 2,
    // transition: "width 0.3s ease",
  },

  strengthText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "right",
  },
});
