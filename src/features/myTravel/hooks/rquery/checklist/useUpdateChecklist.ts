/**
 * @file: useUpdateChecklist.ts
 * @author: chad
 * @since: 2026.05.21 ~
 * @description: 체크리스트 > 카테고리(아이템) 수정
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  IChecklistRequest,
  IChecklistResponse,
} from '@/features/myTravel/interfaces/checklist.interface';
import ChecklistService from '@/features/myTravel/services/Checklist.service';

interface IUseUpdateChecklist {
  travelId: string;
  requestData: IChecklistRequest;
}

export const useUpdateChecklist = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['travelChecklist', travelId];

  return useMutation({
    mutationFn: async ({ travelId, requestData }: IUseUpdateChecklist) => {
      return await ChecklistService.updateChecklist(travelId, requestData);
    },

    onMutate: async ({ requestData }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData =
        queryClient.getQueryData<IChecklistResponse[]>(queryKey);

      queryClient.setQueryData(queryKey, (old: IChecklistResponse[]) => {
        if (!old) return [];

        // 카테고리 수정
        if (requestData.type === 'CATEGORY') {
          return old.map((category) =>
            category.id === requestData.categoryId
              ? { ...category, label: requestData.label }
              : category,
          );
        }

        // 아이템 수정
        if (requestData.type === 'ITEM') {
          return old.map((category) => {
            return category.id === requestData.categoryId
              ? {
                  ...category,
                  items: category.items.map((item) =>
                    item.id === requestData.itemId
                      ? { ...item, isChecked: requestData.isChecked }
                      : item,
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
