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
  verificationContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
    width: "100%",
    textAlign: "center",
    letterSpacing: 2,
  },

  errorBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE5E5",
    borderLeftColor: COLORS.expense,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: 8,
  },
});
