/**
 * @file: useFetchTravelSchedules.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 일정 조회
 */

import { useQuery } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';

export const useFetchTravelSchedules = (id: string) => {
  const query = useQuery({
    queryKey: ['travelSchedules', id],
    queryFn: async () => await MyTravelService.getTravelSchedules(id),
    enabled: !!id,
  });

  return {
    ...query,
    data: query.data,
  };
};
