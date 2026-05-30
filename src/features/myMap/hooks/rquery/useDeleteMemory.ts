/**
 * @file: useDeleteMemory.ts
 * @author: chad
 * @since: 2026.05.28 ~
 * @description: 추억 삭제 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import MemoryService from '@/features/myMap/services/Memory.service';
import { memoryKeys } from '@/features/myMap/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

interface IUseDeleteMemory {
  memoryId: number;
}

export const useDeleteMemory = (mapType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memoryId }: IUseDeleteMemory) => {
      return await MemoryService.deleteMemory(memoryId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoryKeys.list(mapType),
      });

      toast.success('추억을 삭제했어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;

      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '일정을 삭제하는 중 오류가 발생했습니다.');
    },
  });
};
