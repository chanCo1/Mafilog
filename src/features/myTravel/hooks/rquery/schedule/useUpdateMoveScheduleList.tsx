/**
 * @file: useUpdateMoveScheduleList.ts
 * @author: chad
 * @since: 2026.05.29 ~
 * @description: 일정 이동 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ScheduleService from '@/features/myTravel/services/Schedule.service';
import { travelScheduleKeys } from '@/features/myTravel/hooks/rquery/queryKeys';
import {
  IScheduleResponse,
  IScheduleListResponse,
} from '@/features/myTravel/interfaces/schedule.interface';

interface IUseUpdateMoveScheduleList {
  scheduleId: number;
  newOrderedItems: IScheduleListResponse[];
}

export const useUpdateMoveScheduleList = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = travelScheduleKeys.detail(travelId);

  return useMutation({
    mutationFn: async ({ newOrderedItems }: IUseUpdateMoveScheduleList) => {
      const orderedItems = newOrderedItems.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      return await ScheduleService.updateMoveTravelScheduleList(
        travelId,
        orderedItems,
      );
    },

    onMutate: async ({ scheduleId, newOrderedItems }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      // 캐시에 새 배열 업데이트
      queryClient.setQueryData(queryKey, (oldData: IScheduleResponse[]) => {
        if (!oldData) return oldData;

        return oldData.map((schedule) =>
          schedule.id === scheduleId
            ? { ...schedule, scheduleList: newOrderedItems }
            : schedule,
        );
      });

      return { previousData };
    },

    onError: (
      error: any,
      data,
      context,
    ) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '수정 중 오류가 발생했습니다.');

      if (context?.previousData) {
        return queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
