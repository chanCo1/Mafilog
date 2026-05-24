/**
 * @file: useUpdateExpense.ts
 * @author: chad
 * @since: 2026.05.24 ~
 * @description: 가계부 지출 수정
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { IExpenseRequest } from '@/features/myTravel/interfaces/expense.interface';
import ExpenseService from '@/features/myTravel/services/Expense.service';

interface IUseUpdateExpense {
  travelId: string;
  data: IExpenseRequest;
}

export const useUpdateExpense = (
  travelId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseUpdateExpense) => {
      return await ExpenseService.updateTravelExpense(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelExpenses', travelId],
      });

      toast.success('지출을 수정했어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '지출을 수정하는 중 오류가 발생했습니다.');
    },
  });
};
