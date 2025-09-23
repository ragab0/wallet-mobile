import { createTransSchema } from "@/validations/trans.validation";
import * as yup from "yup";
import { IonicIconType } from "./globals";

export interface Category {
  id: string;
  name: string;
  icon: IonicIconType;
}

export type TransType = "expense" | "income";

export interface Trans {
  id: string;
  userId: string;
  amount: string;
  title: string;
  type: TransType;
  category: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Type definitions for the validation schemas
export type CreateTransForm = yup.InferType<typeof createTransSchema> & {
  userId?: string;
};

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}
