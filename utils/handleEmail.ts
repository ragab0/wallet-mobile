import * as Clipboard from "expo-clipboard";
import { Alert, Linking } from "react-native";

const email = process.env.EXPO_PUBLIC_APP_MAIL || "ragab.dev@gmail.com";

/**
 * Helper function to handle email operations
 * @param subject - Email subject
 * @param body - Email body
 * @param successMessage - Message to show when email is copied to clipboard
 */
export async function handleEmail(
  subject: string,
  body: string,
  successMessage: string
) {
  const url = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error("Error opening email:", error);
    try {
      await Clipboard.setStringAsync(email);
      Alert.alert("Email Copied", successMessage);
    } catch (clipboardError) {
      console.error("Error copying to clipboard:", clipboardError);
      Alert.alert(
        "Error",
        "Could not open email client or copy to clipboard. Please try again."
      );
    }
  }
}
