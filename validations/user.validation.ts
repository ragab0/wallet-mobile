import * as yup from "yup";

export const fname = yup
  .string()
  .trim()
  .min(2, "First name must be at least 2 characters")
  .max(50, "First name must be less than 50 characters")
  .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters")
  .required("First name is required");

export const lname = yup
  .string()
  .trim()
  .min(2, "Last name must be at least 2 characters")
  .max(50, "Last name must be less than 50 characters")
  .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters")
  .required("Last name is required");

export const email = yup
  .string()
  .trim()
  .email("Please enter a valid email address")
  .required("Email is required");

export const password = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  )
  .required("Password is required");

export const passwordConfirm = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords do not match")
  .required("Please confirm your password");
