import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // staleTime: 5 * 60 * 1000,
      // gcTime: 10 * 60 * 1000,

      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          // 401, 403, 404 에러는 재시도하지 않음
          if (status === 401 || status === 403 || status === 404) {
            return false;
          }
        }
        // 최대 3번 재시도
        return failureCount < 3;
      },
    },
  },
});
