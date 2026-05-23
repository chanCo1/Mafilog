/**
 * @file: useCreateTravelExpense.ts
 * @author: chad
 * @since: 2026.05.23 ~
 * @description: 여행 가계부 > 지출 등록
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { IExpenseRequest } from '@/features/myTravel/interfaces/expense.interface';
import ExpenseService from '@/features/myTravel/services/Expense.service';

interface IUseCreateTravelExpense {
  travelId: string;
  data: IExpenseRequest;
}

export const useCreateTravelExpense = (travelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseCreateTravelExpense) => {
      return await ExpenseService.createTravelExpense(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['travelExpenses', travelId],
      });

      toast.success('지출을 추가했어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '추가하는 중 오류가 발생했습니다.');
    },
  });
};
