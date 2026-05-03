/**
 * @file: useTimelineDiscplayCount.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: 메모를 제외한 장소 인덱스 값 구하는 hook
 */

import { useMemo } from 'react';
import { IScheduleList } from '@/shared/interfaces';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

interface IuseTimelineDiscplayCount {
  type?: SCHEDULE_TYPE;
  dailyAllSchedule?: IScheduleList[];
  currentIndex?: number;
}

export function useTimelineDiscplayCount({
  currentIndex,
  dailyAllSchedule,
  type,
}: IuseTimelineDiscplayCount) {
  const displayCount = useMemo(() => {
    if (!type || !dailyAllSchedule || currentIndex === undefined) return 0;

    const sliced = dailyAllSchedule?.slice(0, currentIndex + 1);

    const filltered = sliced.filter((schedule) => {
      return schedule.type === SCHEDULE_TYPE.PLACE;
    });

    return filltered.length;
  }, [type, dailyAllSchedule, currentIndex]);

  return displayCount;
}
