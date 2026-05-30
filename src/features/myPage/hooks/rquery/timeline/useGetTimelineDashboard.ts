/**
 * @file: useGetTimelineDashboard.ts
 * @author: chad
 * @since: 2026.05.26 ~
 * @description: 내 여행 타임라인 대시보드 조회
 */

import { useQuery } from '@tanstack/react-query';
import MyTimelineService from '@/features/myPage/services/MyTimeline.service';
import { timelineDashboardKeys } from '@/features/myPage/hooks/rquery/queryKeys';

export const useGetTimelineDashboard = () => {
  const query = useQuery({
    queryKey: timelineDashboardKeys.all,
    queryFn: async () => await MyTimelineService.getMyTimelineDashboard(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    data: query.data,
  };
};
