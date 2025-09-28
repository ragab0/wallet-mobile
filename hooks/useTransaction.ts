import { transactionsService } from "@/services/transaction.service";
import { AppError } from "@/types/error";
import { CreateTransForm, Trans } from "@/types/trans";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query Keys
export const transKeys = {
  all: ["transactions"] as const,
  current: () => [...transKeys.all, "current"] as const,
  summary: () => [...transKeys.all, "summary"] as const,
  single: (id: string) => [...transKeys.all, id] as const,
};

/** Queries */

export function useGetAllTransactionsMine() {
  return useQuery({
    queryKey: transKeys.all,
    queryFn: transactionsService.getAllMine,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useGetTransactionsSummary() {
  return useQuery({
    queryKey: transKeys.summary(),
    queryFn: transactionsService.getSummary,
    staleTime: Infinity,
    retry: 1,
  });
}

export function useGetTransaction(id: string) {
  return useQuery({
    queryKey: transKeys.single(id),
    queryFn: () => transactionsService.getOne(id),
    enabled: !!id,
    staleTime: Infinity,
    retry: 1,
  });
}

/** Mutations */

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTransForm) => transactionsService.create(data),
    onSuccess: (newTransaction) => {
      void queryClient.invalidateQueries({ queryKey: transKeys.summary() });
      queryClient.setQueryData(
        transKeys.all,
        (oldData: Trans[] | undefined) => {
          return oldData ? [newTransaction, ...oldData] : [newTransaction];
        }
      );
      console.log("Transaction created successfully:", newTransaction);
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transactionsService.delete,
    onSuccess: (_, deletedId) => {
      void queryClient.invalidateQueries({ queryKey: transKeys.summary() });
      // Remove from cache
      queryClient.removeQueries({ queryKey: transKeys.single(deletedId) });
      // Update list cache
      queryClient.setQueryData(
        transKeys.all,
        (oldData: Trans[] | undefined) => {
          return oldData?.filter((transaction) => transaction.id !== deletedId);
        }
      );
      console.log("Transaction deleted successfully:", deletedId);
    },
    onError: (error: AppError) => {
      return error;
    },
  });
};

// export const useUpdateTransaction = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: transactionsService.update,
//     onSuccess: (updatedTransaction) => {
//       // Update specific transaction in cache
//       queryClient.setQueryData(
//         transKeys.single(updatedTransaction.id),
//         updatedTransaction
//       );

//       // Update transactions list cache
//       queryClient.setQueryData(
//         transKeys.all,
//         (oldData: Trans[] | undefined) => {
//           return oldData?.map((transaction) =>
//             transaction.id === updatedTransaction.id
//               ? updatedTransaction
//               : transaction
//           );
//         }
//       );

//       console.log("Transaction updated successfully:", updatedTransaction);
//     },
//     onError: (error: AppError) => {
//       return error;
//     },
//   });
// };

// // Batch operations
// export const useBatchDeleteTransactions = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (ids: string[]) => {
//       // Batch delete - assuming API supports it, otherwise use Promise.all
//       await Promise.all(ids.map((id) => transactionsService.delete(id)));
//       return ids;
//     },
//     onSuccess: (deletedIds) => {
//       // Remove individual transactions from cache
//       deletedIds.forEach((id) => {
//         queryClient.removeQueries({ queryKey: transKeys.single(id) });
//       });

//       // Update transactions list cache
//       queryClient.setQueryData(
//         transKeys.all,
//         (oldData: Trans[] | undefined) => {
//           return oldData?.filter(
//             (transaction) => !deletedIds.includes(transaction.id)
//           );
//         }
//       );

//       console.log("Transactions deleted successfully:", deletedIds);
//     },
//     onError: (error: AppError) => {
//       return error;
//     },
//   });
// };
