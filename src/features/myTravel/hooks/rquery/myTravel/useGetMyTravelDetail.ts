/**
 * @file: useGetMyTravelDetail.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 조회
 */

import { useSuspenseQuery } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { myTravelDetailKeys } from '@/features/myTravel/hooks/rquery/queryKeys';
import { IMyTravelDetailResponse } from '@/features/myTravel/interfaces/myTravel.interface';

export const useGetMyTravelDetail = (travelId: string) => {
  const queryKey = myTravelDetailKeys.detail(travelId);

  const query = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      if (!travelId) return {} as IMyTravelDetailResponse;

      return await MyTravelService.getMyTravelDetail(travelId);
    },
    // enabled: !!travelId,
    staleTime: 1000 * 60 * 60 * 1,
  });

  return {
    ...query,
    data: query.data,
  };
};
