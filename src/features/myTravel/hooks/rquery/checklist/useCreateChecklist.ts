/**
 * @file: useCreateChecklist.ts
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
import ChecklistService from '@/features/myTravel/services/Checklist.service';
import { nanoid } from 'nanoid';

interface IUseCreateChecklist {
  travelId: string;
  requestData: Pick<IChecklistRequest, 'type' | 'label' | 'categoryId'>;
}

export const useCreateChecklist = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['travelChecklist', travelId];

  return useMutation({
    mutationFn: async ({ travelId, requestData }: IUseCreateChecklist) => {
      return await ChecklistService.createChecklist(travelId, requestData);
    },

    onMutate: async ({ requestData }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData =
        queryClient.getQueryData<IChecklistResponse[]>(queryKey);
      const tempId = nanoid();

      queryClient.setQueryData(queryKey, (old: IChecklistResponse[]) => {
        if (!old) return [];

        // 카테고리 생성
        if (requestData.type === 'CATEGORY') {
          return [...old, { id: tempId, label: requestData.label, items: [] }];
        }

        // 아이템 생성
        if (requestData.type === 'ITEM') {
          return old.map((category) => {
            return category.id === requestData.categoryId
              ? {
                  ...category,
                  items: [
                    ...category.items,
                    {
                      id: tempId,
                      categoryId: requestData.categoryId,
                      label: requestData.label,
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
