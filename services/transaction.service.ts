import { apiClient } from "@/configs/apiClient";
import { CreateTransForm, Trans } from "@/types/trans";

export const transactionsService = {
  getAllMine: async function () {
    const response = await apiClient.get<Trans[]>(`/transactions/`);
    return response.data;
  },

  create: async function (data: CreateTransForm) {
    const response = await apiClient.post<Trans>("/transactions/", {
      ...data,
      amount: parseInt(data.amount),
    });
    return response.data;
  },

  getOne: async function (id: string) {
    await apiClient.patch<Trans>(`/transactions/${id}`);
    return true;
  },

  update: async function ({ id, ...data }: Partial<Trans>) {
    const response = await apiClient.patch<Trans>(`/transactions/${id}`, data);
    return response.data;
  },

  delete: async function (id: string) {
    await apiClient.patch<Trans>(`/transactions/${id}`);
    return true;
  },
};
