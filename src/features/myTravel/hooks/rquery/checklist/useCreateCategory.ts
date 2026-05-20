/**
 * @file: useCreateCategory.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 체크리스트 > 카테고리(아이템) 등록
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  IChecklistRequest,
  IChecklistResponse,
} from '@/features/myTravel/interfaces/checklist.interface';
import { TChecklistType } from '@/features/myTravel/types/checklist.type';
import ChecklistService from '@/features/myTravel/services/Checklist.service';
import { nanoid } from 'nanoid';

interface IUseMutateSchedulePlace {
  travelId: string;
  data: IChecklistRequest;
}

export const useCreateCategory = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['travelChecklist', travelId];

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseMutateSchedulePlace) => {
      return await ChecklistService.postChecklist(travelId, data);
    },

    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData =
        queryClient.getQueryData<IChecklistResponse[]>(queryKey);
      const tempId = nanoid();

      queryClient.setQueryData(queryKey, (old: IChecklistResponse[]) => {
        if (!old) return [];

        if (data.type === 'CATEGORY') {
          return [...old, { id: tempId, label: data.label, items: [] }];
        }

        if (data.type === 'ITEM') {
          return old.map((category) => {
            return category.id === data.categoryId
              ? {
                  ...category,
                  items: [
                    ...category.items,
                    {
                      id: tempId,
                      categoryId: data.categoryId,
                      label: data.label,
                      isChecked: false,
                    },
                  ],
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
      toast.error(errorMessage || '장소를 추가하는 중 오류가 발생했습니다.');

      if (context?.previousData) {
        return queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
