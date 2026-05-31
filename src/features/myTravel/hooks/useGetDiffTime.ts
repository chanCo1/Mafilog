/**
 * @file: useGetDiffTime.ts
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: timezone 기준으로 시간차 계산 훅
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useMemo } from 'react';

/** 플러그인 */
dayjs.extend(utc);
dayjs.extend(timezone);

interface IGetDiffTime {
  targetTimeZone: string | undefined;
}

export const useGetDiffTime = ({ targetTimeZone }: IGetDiffTime) => {
  
  const getTime = useMemo(() => {
    const day = dayjs();
    if (!targetTimeZone) return null;

    const seoulTime = day.tz('Asia/Seoul');
    const targetTime = day.tz(targetTimeZone);

    const seoulOffset = seoulTime.utcOffset();
    const targetOffset = targetTime.utcOffset();

    const diffHours = (targetOffset - seoulOffset) / 60;

    return {
      seoulDate: seoulTime.format('YYYY-MM-DD'),
      seoulTime: seoulTime.format('HH:mm'),
      targetDate: targetTime.format('YYYY-MM-DD'),
      targetTime: targetTime.format('HH:mm'),
      diffHours: diffHours,
    };
  }, [targetTimeZone]);

  return getTime;
};
