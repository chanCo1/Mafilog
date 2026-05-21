/**
 * @file: useGetMyTravelList.ts
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 내 여행 리스트 조회
 */

import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import MyTravelService from '@/features/myTravel/services/MyTravel.service';
import { getTravelStatus } from '@/shared/lib/utils';
import { TRAVEL_STATUS } from '@/shared/types/Enum';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';

interface ITravelSections {
  progress: IMyTravelListResponse[];
  upcoming: IMyTravelListResponse[];
  last: IMyTravelListResponse[];
}

/** 자정에 업데이트 하기 위함 */
const getDiffMidnight = (): number => {
  const now = dayjs();
  const midnight = now.add(1, 'day').startOf('day');

  return midnight.diff(now);
};

export const useGetMyTravelList = (userId: string | undefined) => {
  const query = useQuery({
    queryKey: ['myTravelList'],
    queryFn: async () => await MyTravelService.getMyTravelList(),
    staleTime: getDiffMidnight(),
    gcTime: 1000 * 60 * 60 * 36,
    enabled: !!userId,

    select: (list): ITravelSections => {
      if (!list) return { progress: [], upcoming: [], last: [] };

      const progress = list.filter(
        (travel) =>
          getTravelStatus(travel.from, travel.to) === TRAVEL_STATUS.PROGRESS,
      );
      const upcoming = list.filter(
        (travel) =>
          getTravelStatus(travel.from, travel.to) === TRAVEL_STATUS.UPCOMING,
      );
      const last = list.filter(
        (travel) =>
          getTravelStatus(travel.from, travel.to) === TRAVEL_STATUS.LAST,
      );

      return { progress, upcoming, last };
    },
  });

  return {
    ...query,
    data: query.data,
  };
};
