/**
 * @file: useGetTimelineExpenses.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 내 여행 타임라인 지출 조회
 */

import { useQuery } from '@tanstack/react-query';
import ExpenseService from '@/features/myTravel/services/Expense.service';
import { myTimelineKeys } from '@/features/myPage/hooks/rquery/queryKeys';

export const useGetTimelineExpenses = (travelId: number) => {
  const query = useQuery({
    queryKey: myTimelineKeys.detail(String(travelId)),
    queryFn: async () =>
      await ExpenseService.getTravelExpenses(String(travelId)),
    enabled: !!travelId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
