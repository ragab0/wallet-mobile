import { styles } from "@/assets/styles/settings.styles";
import { Ionicons } from "@expo/vector-icons";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface props {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function PopupModal({
  visible,
  onClose,
  title,
  children,
}: props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#8B593E" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}
