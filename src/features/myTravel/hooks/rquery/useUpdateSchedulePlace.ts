/**
 * @file: useUpdateSchedulePlace.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 일정 수정 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { IUpdateSchedulePlaceRequest } from '@/features/myTravel/interfaces/schedule.interface';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';

interface IUseUpdateSchedulePlace {
  travelId: string;
  data: IUpdateSchedulePlaceRequest;
}

export const useUpdateSchedulePlace = (travelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseUpdateSchedulePlace) => {
      return await MyTravelService.updateTravelSchedulePlace(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelSchedules', travelId],
      });

      toast.success('장소를 수정했어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '장소를 수정하는 중 오류가 발생했습니다.');
    },
  });
};
