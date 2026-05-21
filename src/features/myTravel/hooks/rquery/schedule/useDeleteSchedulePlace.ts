/**
 * @file: useDeleteSchedulePlace.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 일정 삭제 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

interface IUseDeleteSchedulePlace {
  travelId: string;
  deleteIds: number[];
}

export const useDeleteSchedulePlace = (
  travelId: string,
  type?: SCHEDULE_TYPE,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, deleteIds }: IUseDeleteSchedulePlace) => {
      return await MyTravelService.deleteTravelSchedulePlace(
        travelId,
        deleteIds,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelSchedules', travelId],
      });

      if (type) {
        toast.success(
          type === SCHEDULE_TYPE.PLACE
            ? '장소를 삭제했어요'
            : '메모를 삭제했어요',
        );
      } else {
        toast.success('일정을 삭제했어요');
      }
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '일정을 삭제하는 중 오류가 발생했습니다.');
    },
  });
};
