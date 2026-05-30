/**
 * @file: useUpdateMyTravel.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 여행 상세 수정 react query
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import {
  myTravelListKeys,
  myTravelDetailKeys,
  travelExpensesKeys,
  travelScheduleKeys,
} from '@/features/myTravel/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

export const useUpdateMyTravel = (travelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      return await MyTravelService.updateMyTravelDetail(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myTravelListKeys.all });
      queryClient.invalidateQueries({
        queryKey: myTravelDetailKeys.detail(travelId),
      });
      queryClient.invalidateQueries({
        queryKey: travelScheduleKeys.detail(travelId),
      });
      queryClient.invalidateQueries({
        queryKey: travelExpensesKeys.detail(travelId),
      });

      toast.success('여행 정보가 수정되었어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '수정하는 중 오류가 발생했습니다.');
    },
  });
};
