import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/send-verification">Send-Verification</Link>
      <Link href="/verify-code">Verify-Code</Link>
    </View>
  );
}
