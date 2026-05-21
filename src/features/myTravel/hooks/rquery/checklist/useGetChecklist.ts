/**
 * @file: useGetChecklist.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 여행 체크리스트 조회 react query
 */

import { useQuery } from '@tanstack/react-query';
import ChecklistService from '@/features/myTravel/services/Checklist.service';

export const useGetChecklist = (travelId: string, isFetch: boolean) => {
  const query = useQuery({
    queryKey: ['travelChecklist', travelId],
    queryFn: async () => await ChecklistService.getTravelChecklist(travelId),
    enabled: !!travelId && isFetch,
    staleTime: 1000 * 60 * 1, 
    gcTime: 1000 * 60 * 10,
  });

  return {
    ...query,
    data: query.data,
  };
};
