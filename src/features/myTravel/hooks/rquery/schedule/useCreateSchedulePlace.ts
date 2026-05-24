/**
 * @file: useCreateSchedulePlace.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 일정 등록 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ISchedulePlaceRequest } from '@/features/myTravel/interfaces/schedule.interface';
import ScheduleService from '@/features/myTravel/services/Schedule.service';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { travelScheduleKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

interface IUseCreateSchedulePlace {
  travelId: string;
  data: ISchedulePlaceRequest;
}

export const useCreateSchedulePlace = (
  travelId: string,
  type: SCHEDULE_TYPE,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseCreateSchedulePlace) => {
      return await ScheduleService.createTravelSchedulePlace(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: travelScheduleKeys.detail(travelId),
      });

      toast.success(
        type === SCHEDULE_TYPE.PLACE
          ? '장소를 추가했어요'
          : '메모를 추가했어요',
      );
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '장소를 추가하는 중 오류가 발생했습니다.');
    },
  });
};
