/**
 * @file: useTravelDaysList.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: 여행 기간에 따른 날짜 리스트 hook
 */

// TODO: 삭제 예정

import { useMemo } from 'react';
import {
  getTravelDayOfWeek,
  getDay,
  convertFormattedDate,
} from '@/shared/lib/utils';

interface IuseTravelDaysList {
  from: Date;
  to: Date;
}

export default function useTravelDaysList({ from, to }: IuseTravelDaysList) {
  const travelDaysList = useMemo(() => {
    return getTravelDayOfWeek(from, to).map((_day) => {
      return {
        label: `${_day.day}일차 ${convertFormattedDate(_day.date, 'MM월 dd일')} (${getDay(_day.date)})`,
        value: _day.day,
      };
    });
  }, [from, to]);

  return travelDaysList;
}
