import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },
  img: {
    height: 310,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.x2Large,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SIZES.large,
  },
  formContainer: {
    width: "100%",
    gap: 15,
  },
  input: {
    width: "100%",
    fontSize: SIZES.default,
    backgroundColor: COLORS.white,
    color: COLORS.text,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
  },
  inputError: {
    borderColor: COLORS.expense,
  },
  textError: {
    color: COLORS.expense,
    fontSize: SIZES.medium - 1,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
    pointerEvents: "none",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: COLORS.text,
    fontSize: SIZES.default,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: SIZES.default,
    fontFamily: FONTS.semiBold,
  },

  successBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    color: "#155724",
    backgroundColor: "#d4edda",
    borderLeftColor: "#c3e6cb",
    borderLeftWidth: 6,
    borderRadius: 12,
    padding: 12,
  },
  successText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  emailText: {
    fontWeight: "600",
    color: "#1F2937",
  },
  codeContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
  },
  resendButtonDisabled: {
    color: "#9CA3AF",
  },
});
