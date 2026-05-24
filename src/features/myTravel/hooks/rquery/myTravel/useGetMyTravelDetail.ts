/**
 * @file: useGetMyTravelDetail.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 조회
 */

import { useQuery } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { myTravelDetailKeys } from '@/features/myTravel/hooks/rquery/queryKeys';

export const useGetMyTravelDetail = (travelId: string) => {
  const queryKey = myTravelDetailKeys.detail(travelId);

  const query = useQuery({
    queryKey,
    queryFn: async () => await MyTravelService.getMyTravelDetail(travelId),
    enabled: !!travelId,
  });

  return {
    ...query,
    data: query.data,
  };
};
