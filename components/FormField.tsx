import { styles as authStyles, styles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/theme";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface FormFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: FieldError;
  editable?: boolean;
  inputStyle?: any;
  saveErrorSpace?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error,
  editable = true,
  inputStyle,
  saveErrorSpace = true,
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              inputStyle || authStyles.input,
              error && authStyles.inputError,
            ]}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textLight}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable}
            autoCorrect={false}
          />
        )}
      />
      {saveErrorSpace && (
        <Text style={styles.textError}>{error ? error.message : " "}</Text>
      )}
    </View>
  );
};
