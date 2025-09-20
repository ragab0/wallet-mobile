export type Category =
  | "Food & Drinks"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Bills"
  | "Income"
  | "Other";

export interface Trans {
  id: string;
  userId: string;
  amount: string;
  title: string;
  type?: string;
  category: Category;
  note?: string;
  createdAt: string;
  updatedAt: string;
}
