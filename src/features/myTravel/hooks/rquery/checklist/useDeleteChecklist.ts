/**
 * @file: useDeleteChecklist.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 체크리스트 > 카테고리(아이템) 삭제
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  IChecklistRequest,
  IChecklistResponse,
} from '@/features/myTravel/interfaces/checklist.interface';
import ChecklistService from '@/features/myTravel/services/Checklist.service';
import { travelChecklistKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

interface IUseDeleteChecklist {
  travelId: string;
  requestData: Omit<IChecklistRequest, 'isChecked'>;
}

export const useDeleteChecklist = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = travelChecklistKeys.detail(travelId);

  return useMutation({
    mutationFn: async ({ travelId, requestData }: IUseDeleteChecklist) => {
      return await ChecklistService.deleteChecklist(travelId, requestData);
    },

    onMutate: async ({ requestData }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData =
        queryClient.getQueryData<IChecklistResponse[]>(queryKey);

      queryClient.setQueryData(queryKey, (old: IChecklistResponse[]) => {
        if (!old) return [];

        // 카테고리 삭제
        if (requestData.type === 'CATEGORY') {
          return old.filter((category) => category.id !== requestData.categoryId);
        }

        // 아이템 삭제
        if (requestData.type === 'ITEM') {
          return old.map((category) => {
            return category.id === requestData.categoryId
              ? {
                  ...category,
                  items: category.items.filter(
                    (item) => item.id !== requestData.itemId,
                  ),
                }
              : category;
          });
        }
      });

      return { previousData };
    },

    onError: (
      error: any,
      data,
      context: { previousData: IChecklistResponse[] | undefined } | undefined,
    ) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '삭제 중 오류가 발생했습니다.');

      if (context?.previousData) {
        return queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
