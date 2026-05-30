/**
 * @file: useCreateMyTravelList.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 새 여행 생성 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { toast } from 'sonner';
import { myTravelListKeys } from '@/features/myTravel/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

export const useCreateMyTravelList = () => {
  const queryClient = useQueryClient();
  const queryKey = myTravelListKeys.all;

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await MyTravelService.createTravel(formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success('새 여행을 만들었어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '여행을 생성하는 중 오류가 발생했습니다.');
    },
  });
};
