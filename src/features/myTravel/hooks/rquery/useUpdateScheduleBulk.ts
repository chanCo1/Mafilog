/**
 * @file: useUpdateBulkScheduleDate.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 일정 선택 이동 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';

interface IUseUpdateBulkScheduleDate {
  travelId: string;
  data: { moveIds: number[]; targetDay: number };
}

export const useUpdateBulkScheduleDate = (travelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseUpdateBulkScheduleDate) => {
      return await MyTravelService.updateBulkTravelScheduleDate(
        travelId,
        data,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelSchedules', travelId],
      });

      toast.success('일정을 이동했어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '일정을 이동하는 중 오류가 발생했습니다.');
    },
  });
};
