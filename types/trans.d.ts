import { createTransSchema } from "@/validations/trans.validation";
import { Ionicons } from "@expo/vector-icons";
import * as yup from "yup";

export type Icon = keyof typeof Ionicons.glyphMap;

export interface Category {
  id: string;
  name: string;
  icon: Icon;
}

export interface Trans {
  id: string;
  userId: string;
  amount: string;
  title: string;
  type: string;
  category: Category;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Type definitions for the validation schemas
export type CreateTransForm = yup.InferType<typeof createTransSchema>;
