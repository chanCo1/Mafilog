/**
 * @file: useGetMyTimelineList.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 타임라인 리스트 조회
 */

import { useQuery } from '@tanstack/react-query';
import MyTimelineService from '@/features/myPage/services/MyTimeline.service';
import { myTimelineKeys } from '@/features/myPage/hooks/rquery/queryKeys';

export const useGetMyTimelineList = () => {
  const query = useQuery({
    queryKey: myTimelineKeys.all,
    queryFn: async () => await MyTimelineService.getMyTimelineList(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
