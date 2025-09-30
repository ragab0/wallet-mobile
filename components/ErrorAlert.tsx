import { shadows } from "@/assets/styles/globals.styles";
import { useSlideInFromY } from "@/hooks/useAnimation";
import { AppError } from "@/types/error";
import { ErrorHandler } from "@/utils/errorHandler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ErrorAlertProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
  showRetry?: boolean;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error: e,
  onRetry,
  onDismiss,
  showRetry = true,
}) => {
  const [error, setError] = useState<AppError | null>(e);
  const iconName = ErrorHandler.getErrorIcon(e.type);
  const iconColor = ErrorHandler.getErrorColor(e.type);
  const errorAnim = useSlideInFromY(300, 0, false);
  const errorStyles = createErrorStyles(iconColor);

  if (!error) return;

  return (
    <Animated.View
      style={[
        errorStyles.errorContainer,
        {
          opacity: errorAnim.opacity,
          transform: [{ translateY: errorAnim.translateY }],
        },
      ]}
    >
      <View style={errorStyles.errorContent}>
        <Ionicons name={iconName} size={24} color={iconColor} />
        <View style={errorStyles.errorTextContainer}>
          <Text style={errorStyles.errorTitle}>{error.message}</Text>
          {error.details && (
            <Text style={errorStyles.errorDetails}>{error.details}</Text>
          )}
        </View>
      </View>

      <View style={errorStyles.errorActions}>
        {showRetry && error.retryable && onRetry && (
          <TouchableOpacity style={errorStyles.retryButton} onPress={onRetry}>
            <Text style={errorStyles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={errorStyles.dismissButton}
          onPress={onDismiss ? onDismiss : () => setError(null)}
        >
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const createErrorStyles = (color: string) =>
  StyleSheet.create({
    errorContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#FEF2F2",
      borderColor: color,
      borderLeftWidth: 4,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      ...shadows.shadowCard,
    },
    errorContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    errorTextContainer: {
      flex: 1,
      marginLeft: 12,
    },
    errorTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: color,
      textTransform: "capitalize",
    },
    errorDetails: {
      fontSize: 14,
      color: "#7F1D1D",
      lineHeight: 20,
    },
    errorActions: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 12,
    },
    retryButton: {
      backgroundColor: color,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      marginRight: 8,
    },
    retryButtonText: {
      color: "white",
      fontSize: 14,
      fontWeight: "600",
    },
    dismissButton: {
      padding: 4,
    },
  });
