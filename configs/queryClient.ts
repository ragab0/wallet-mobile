import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 1, // 1 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});
