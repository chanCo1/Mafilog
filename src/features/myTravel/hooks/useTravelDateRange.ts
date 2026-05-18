/**
 * @file: useTravelDateRange.tss
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 여행 기간 포멧 노출 (YYYY.MM.DD ~ YYYY.MM.DD)
 */

import { useMemo } from 'react';
import { convertFormattedDate, getTravelDay, getDay } from '@/shared/lib/utils';

interface IUseTravelDateRange {
  from: Date;
  to: Date;
}

export default function useTravelDateRange({ from, to }: IUseTravelDateRange) {
  const formattedValue = useMemo(() => {
    if (!from || !to) return '';

    if (from === to) {
      return `${convertFormattedDate(from)}(${getDay(from)}) (${getTravelDay(from, to)}일)`;
    }

    return `${convertFormattedDate(from)}(${getDay(from)}) ~ ${convertFormattedDate(to)}(${getDay(to)}) (${getTravelDay(from, to)}일)`;
  }, [from, to]);

  return formattedValue;
}
