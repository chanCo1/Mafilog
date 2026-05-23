/**
 * @file: useDeleteExpense.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 가계부 지출 삭제
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ExpenseService from '@/features/myTravel/services/Expense.service';

interface IUseDeleteExpense {
  travelId: string;
  deleteIds: number[];
}

export const useDeleteExpense = (
  travelId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, deleteIds }: IUseDeleteExpense) => {
      return await ExpenseService.deleteTravelExpense(
        travelId,
        deleteIds,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelExpenses', travelId],
      });

      toast.success('지출을 삭제했어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '지출을 삭제하는 중 오류가 발생했습니다.');
    },
  });
};
