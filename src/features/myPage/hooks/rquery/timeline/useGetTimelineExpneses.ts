/**
 * @file: useGetMyTimelineList.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 내 여행 타임라인 지출 조회
 */

import { useQuery } from '@tanstack/react-query';
import MyTimelineService from '@/features/myPage/services/MyTimeline.service';
import { myTimelineKeys } from '@/features/myPage/hooks/rquery/queryKeys';

export const useGetMyTimelineList = (travelId: string) => {
  const query = useQuery({
    queryKey: myTimelineKeys.detail(travelId),
    queryFn: async () =>
      await MyTimelineService.getMyTimelineExpenses(travelId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
