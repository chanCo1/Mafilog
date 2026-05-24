/**
 * @file: useUpdateBulkExpenseDate.ts
 * @author: chad
 * @since: 2026.05.22 ~
 * @description: 일정 선택 이동 Mutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import ExpenseService from '@/features/myTravel/services/Expense.service';
import { travelExpensesKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

interface IUseUpdateBulkExpenseDate {
  travelId: string;
  data: { moveIds: number[]; targetDay: number };
}

export const useUpdateBulkExpenseDate = (travelId: string) => {
  const queryClient = useQueryClient();
  const queryKey = travelExpensesKeys.detail(travelId);

  return useMutation({
    mutationFn: async ({ travelId, data }: IUseUpdateBulkExpenseDate) => {
      return await ExpenseService.updateBulkTravelExpenseDate(travelId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      toast.success('지출을 이동했어요');
    },

    onError: (error: any) => {
      const errorMessage = error.response?.data.message;
      toast.error(errorMessage || '지출을 이동하는 중 오류가 발생했습니다.');
    },
  });
};
