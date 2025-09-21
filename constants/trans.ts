import { Category } from "@/types/trans";

export const CATEGORIES: Category[] = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

export const CATEGORIES_INDEXED = CATEGORIES.reduce<Record<string, Category>>(
  function (acc, curr) {
    acc[curr.id] = curr;
    return acc;
  },
  {}
);
