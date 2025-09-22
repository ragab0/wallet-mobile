import { transactionsService } from "@/services/transaction.service";
import { AppError } from "@/types/error";
import { CreateTransForm, Trans } from "@/types/trans";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllTransactionsMine() {
  return useQuery({
    queryKey: ["transactionsMine"],
    queryFn: transactionsService.getAllMine,
    staleTime: Infinity,
    retry: 1,
  });
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTransForm) => transactionsService.create(data),
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(
        ["transactionsMine"],
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

// Update transaction mutation
// export const useUpdateTransaction = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: transactionService.update,
//     onSuccess: (updatedTransaction) => {
//       // Invalidate and refetch transactions list
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });

//       // Update specific transaction in cache
//       queryClient.setQueryData(
//         ["transaction", updatedTransaction.id],
//         updatedTransaction
//       );

//       // Update transactions list cache
//       queryClient.setQueryData(
//         ["transactions"],
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

// Delete transaction mutation
// export const useDeleteTransaction = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: transactionService.delete,
//     onSuccess: (_, deletedId) => {
//       // Invalidate and refetch transactions list
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });

//       // Remove transaction from cache
//       queryClient.removeQueries({ queryKey: ["transaction", deletedId] });

//       // Update transactions list cache
//       queryClient.setQueryData(
//         ["transactions"],
//         (oldData: Trans[] | undefined) => {
//           return oldData?.filter((transaction) => transaction.id !== deletedId);
//         }
//       );

//       console.log("Transaction deleted successfully:", deletedId);
//     },
//     onError: (error: AppError) => {
//       return error;
//     },
//   });
// };

// Batch operations (optional)
// export const useBatchDeleteTransactions = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (ids: string[]) => {
//       // TODO: Replace with actual batch API call
//       await Promise.all(ids.map((id) => transactionService.delete(id)));
//     },
//     onSuccess: (_, deletedIds) => {
//       // Invalidate transactions list
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });

//       // Remove transactions from cache
//       deletedIds.forEach((id) => {
//         queryClient.removeQueries({ queryKey: ["transaction", id] });
//       });

//       console.log("Transactions deleted successfully:", deletedIds);
//     },
//     onError: (error: AppError) => {
//       return error;
//     },
//   });
// };
