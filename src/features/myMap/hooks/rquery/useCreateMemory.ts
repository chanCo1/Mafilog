/**
 * @file: useCreateMemory.ts
 * @author: chad
 * @since: 2026.05.26 ~
 * @description: 추억 생성 리액트쿼리
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import MemoryService from '@/features/myMap/services/Memory.service';
import { toast } from 'sonner';
import { memoryKeys } from '@/features/myMap/hooks/rquery/queryKeys';

export const useCreateMemory = (mapType: string) => {
  const queryClient = useQueryClient();
  const queryKey = memoryKeys.list(mapType);

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await MemoryService.createMemory(formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success('새 추억을 만들었어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '추억을 생성하는 중 오류가 발생했습니다.');
    },
  });
};
