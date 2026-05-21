/**
 * @file: useGetTravelSchedules.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 일정 조회
 */

import { useQuery } from '@tanstack/react-query';
import ScheduleService from '@/features/myTravel/services/Schedule.service';

export const useGetTravelSchedules = (id: string) => {
  const query = useQuery({
    queryKey: ['travelSchedules', id],
    queryFn: async () => await ScheduleService.getTravelSchedules(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
