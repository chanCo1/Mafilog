/**
 * @file: useGetMyTravelDetail.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 조회
 */

import { useQuery } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';

export const useGetMyTravelDetail = (id: string) => {
  const query = useQuery({
    queryKey: ['myTravelDetail', id],
    queryFn: async () => await MyTravelService.getMyTravelDetail(id),
    enabled: !!id,
  });

  return {
    ...query,
    data: query.data,
  };
};
