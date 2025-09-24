import * as yup from "yup";
import { fname, lname, password } from "./user.validation";

export const profileSchema = yup.object({
  fname,
  lname,
});

export const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your password"),
});
