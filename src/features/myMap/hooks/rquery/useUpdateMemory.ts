/**
 * @file: useUpdateMemory.ts
 * @author: chad
 * @since: 2026.05.29 ~
 * @description: 여행 상세 수정 react query
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import MemoryService from '@/features/myMap/services/Memory.service';
import { memoryKeys } from '@/features/myMap/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

export const useUpdateMemory = (mapType: string, memoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      return await MemoryService.updateMemory(memoryId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memoryKeys.list(mapType) });
      queryClient.invalidateQueries({ queryKey: memoryKeys.detail(memoryId) });

      toast.success('추억 정보가 수정되었어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;

      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '수정하는 중 오류가 발생했습니다.');
    },
  });
};
