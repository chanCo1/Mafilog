/**
 * @file: useGetTravelExpenses.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 여행 가계부 리스트 조회
 */

import { useQuery } from '@tanstack/react-query';
import ExpenseService from '@/features/myTravel/services/Expense.service';
import { travelExpensesKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

export const useGetTravelExpenses = (travelId: string) => {
  const queryKey = travelExpensesKeys.detail(travelId);

  const query = useQuery({
    queryKey,
    queryFn: async () => await ExpenseService.getTravelExpenses(travelId),
    enabled: !!travelId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
