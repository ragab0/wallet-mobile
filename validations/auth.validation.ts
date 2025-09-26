import * as yup from "yup";
import {
  email,
  fname,
  lname,
  password,
  passwordConfirm,
} from "./user.validation";

export const loginSchema = yup.object().shape({
  email,
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object().shape({
  fname,
  lname,
  email,
  password,
  passwordConfirm,
});

export const sendVerifyEmailSchema = yup.object().shape({
  email,
});

export const verifyCodeSchema = yup.object().shape({
  email,
  code: yup
    .string()
    .trim()
    .matches(/^\d{6}$/, "Verification code must be exactly 6 digits")
    .required("Verification code is required"),
});
