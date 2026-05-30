/**
 * @file: useUpdateMoveExpenseList.ts
 * @author: chad
 * @since: 2026.05.29 ~
 * @description: 지출 이동 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ExpenseService from '@/features/myTravel/services/Expense.service';
import { IExpenseResponse, IExpenseList } from '@/features/myTravel/interfaces/expense.interface';
import { travelExpensesKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

interface IUseUpdateMoveExpenseList {
  expenseId: number;
  newOrderedItems: IExpenseList[];
}

export const useUpdateMoveExpenseList = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = travelExpensesKeys.detail(travelId);

  return useMutation({
    mutationFn: async ({ newOrderedItems }: IUseUpdateMoveExpenseList) => {
      const orderedItems = newOrderedItems.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      return await ExpenseService.updateMoveTravelExpenseList(
        travelId,
        orderedItems,
      );
    },

    onMutate: async ({ expenseId, newOrderedItems }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      // 캐시에 새 배열 업데이트
      queryClient.setQueryData(queryKey, (oldData: IExpenseResponse[]) => {
        if (!oldData) return oldData;

        return oldData.map((expense) =>
          expense.id === expenseId
            ? { ...expense, expenseList: newOrderedItems }
            : expense,
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
