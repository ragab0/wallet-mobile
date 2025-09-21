import { TransType } from "@/types/trans";
import * as yup from "yup";

// const categorySchema: yup.ObjectSchema<Category> = yup.object({
//   id: yup.string().required("Category ID is required"),
//   name: yup.string().required("Category name is required"),
//   icon: yup.mixed<Icon>().required("Category icon is required"),
// });

export const createTransSchema = yup.object({
  userId: yup.string().required("User ID is required"),
  amount: yup
    .string()
    .required("Amount is required")
    .test("is-valid-amount", "Please enter a valid amount", (value) => {
      if (!value) return false;
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0;
    })
    .test(
      "is-valid-decimal",
      "Amount can have maximum 2 decimal places",
      (value) => {
        if (!value) return false;
        const decimalPlaces = value.split(".")[1]?.length || 0;
        return decimalPlaces <= 2;
      }
    ),

  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title cannot exceed 50 characters")
    .trim(),

  type: yup
    .string<TransType>()
    .required("Type is required")
    .oneOf(["expense", "income"], "Type must be either expense or income"),

  category: yup.string().required("Category is required"),

  note: yup
    .string()
    .trim()
    .max(200, "Note cannot exceed 200 characters")
    .optional(),
});
