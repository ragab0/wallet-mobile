import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface CodeInputProps {
  value: string;
  onChangeText: (code: string) => void;
  length?: number;
  error?: boolean;
  editable?: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  value,
  onChangeText,
  length = 6,
  error = false,
  editable = true,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0] && editable) {
      inputRefs.current[0].focus();
    }
  }, [editable]);

  const handleChangeText = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/[^0-9]/g, "");

    if (digit.length > 1) {
      // Handle paste of multiple digits
      const digits = digit.slice(0, length);
      onChangeText(digits);

      // Focus the next empty input or last input
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Update the code
    const newCode = value.split("");
    newCode[index] = digit;
    onChangeText(newCode.join(""));

    // Move focus
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.input,
            focusedIndex === index && styles.inputFocused,
            error && styles.inputError,
          ]}
          value={value[index] || ""}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          editable={editable}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
  },
  inputFocused: {
    borderColor: "#3B82F6",
    backgroundColor: "#F8FAFF",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
});
