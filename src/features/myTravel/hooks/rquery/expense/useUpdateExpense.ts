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
import { travelExpensesKeys } from '@/features/myTravel/hooks/rquery/queryKeys';
import { AxiosError } from 'axios';

interface IUseUpdateExpense {
  travelId: string;
  data: IExpenseRequest;
}

export const useUpdateExpense = (
  travelId: string,
) => {
  const queryClient = useQueryClient();
  const queryKey = travelExpensesKeys.detail(travelId);

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseUpdateExpense) => {
      return await ExpenseService.updateTravelExpense(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success('지출을 수정했어요');
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || '지출을 수정하는 중 오류가 발생했습니다.');
    },
  });
};
