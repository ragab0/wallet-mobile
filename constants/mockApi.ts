import { Trans } from "@/types/trans";

const user = {
  emailAddress: "ragab.dev@gmail.com",
  fname: "ragab",
};

export const summary = {
  balance: "5",
  income: "5",
  expenses: "10",
};

let i = 0;
// export const transactions = [];
export const transactions: Trans[] = [
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
  {
    id: String(++i),
    userId: "123456",
    amount: "50",
    title: "trans" + i,
    type: "expense",
    category: "Shopping",
    note: "no note",
    createdAt: "2025-09-20T03:18:43.937Z",
    updatedAt: "2025-09-20T03:18:43.937Z",
  },
];
