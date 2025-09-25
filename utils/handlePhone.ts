import * as Clipboard from "expo-clipboard";
import { Alert, Linking } from "react-native";

export async function openPhone() {
  const phoneNumber = "+201094545736";
  const url = `tel:${phoneNumber}`;

  try {
    await Linking.openURL(url);
  } catch (error) {
    console.error("Error opening phone:", error);
    try {
      await Clipboard.setStringAsync(phoneNumber);
      Alert.alert(
        "Phone Number Copied",
        "Support phone number has been copied to your clipboard."
      );
    } catch (clipboardError) {
      console.error("Error copying to clipboard:", clipboardError);
      Alert.alert(
        "Error",
        "Could not open phone app or copy to clipboard. Please try again."
      );
    }
  }
}
