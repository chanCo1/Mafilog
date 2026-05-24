/**
 * @file: useGetTravelSchedules.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 일정 조회
 */

import { useQuery } from '@tanstack/react-query';
import ScheduleService from '@/features/myTravel/services/Schedule.service';
import { travelScheduleKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

export const useGetTravelSchedules = (travelId: string) => {
  const query = useQuery({
    queryKey: travelScheduleKeys.detail(travelId),
    queryFn: async () => await ScheduleService.getTravelSchedules(travelId),
    enabled: !!travelId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
