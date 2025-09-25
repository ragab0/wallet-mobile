import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface props {
  children: React.ReactNode;
}

export default function KeyboardLayout({ children }: props) {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={false}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
