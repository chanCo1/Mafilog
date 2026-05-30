/**
 * @file: useUpdateBulkScheduleDate.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 일정 선택 이동 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ScheduleService from '@/features/myTravel/services/Schedule.service';
import { travelScheduleKeys } from '@/features/myTravel/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

interface IUseUpdateBulkScheduleDate {
  travelId: string;
  data: { moveIds: number[]; targetDay: number };
}

export const useUpdateBulkScheduleDate = (travelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseUpdateBulkScheduleDate) => {
      return await ScheduleService.updateBulkTravelScheduleDate(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: travelScheduleKeys.detail(travelId),
      });

      toast.success('일정을 이동했어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '일정을 이동하는 중 오류가 발생했습니다.');
    },
  });
};
