/**
 * @file: useDeleteMyTravel.ts
 * @author: chad
 * @since: 2026.05.24 ~
 * @description: 여행 삭제
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { toast } from 'sonner';
import { myTravelListKeys } from '@/features/myTravel/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

export const useDeleteMyTravel = () => {
  const queryClient = useQueryClient();
  const queryKey = myTravelListKeys.all;

  return useMutation({
    mutationFn: async (travelId: string) => {
      return await MyTravelService.deleteMyTravel(travelId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success('여행을 삭제했어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '여행을 삭제하는 중 오류가 발생했습니다.');
    },
  });
};
