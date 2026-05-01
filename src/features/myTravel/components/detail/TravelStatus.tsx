/**
 * @file: TravelStatus.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelStatus 컴포넌트, 여행 상태
 */

import { useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import { calcDDay } from '@/shared/lib/utils';
import { TRAVEL_STATUS_LIST } from '@/features/myTravel/constants';
import { TRAVEL_STATUS } from '@/shared/types/Enum';
import { getTravelCurrentDay, getTravelDay } from '@/shared/lib/utils';

interface ITravelStatus {
  status: string;
  from: Date;
  to: Date;
}

export default function TravelStatus({ status, from, to }: ITravelStatus) {
  /** 상태 라벨 */
  const getStatusLabel = useMemo(() => {
    const _status = TRAVEL_STATUS_LIST.find((list) => list.value === status);

    if (_status?.value === TRAVEL_STATUS.PROGRESS) {
      return _status?.label;
    } else {
      return `${_status?.label} 여행`;
    }
  }, [status]);

  /** 상태 색상 */
  const getStatusColor = useMemo(() => {
    switch (status) {
      case TRAVEL_STATUS.PROGRESS:
        return 'text-state-info';
      case TRAVEL_STATUS.UPCOMING:
        return 'text-state-warning';
      case TRAVEL_STATUS.LAST:
        return 'text-state-error';
      default:
        return 'text-text-priamry';
    }
  }, [status]);

  /** 상태에 따른 추가 문구 */
  const getStatusBadge = useMemo(() => {
    switch (status) {
      case TRAVEL_STATUS.PROGRESS:
        return getTravelCurrentDay(from, to) === getTravelDay(from, to)
          ? '마지막날'
          : `${getTravelCurrentDay(from, to)}일차`;
      case TRAVEL_STATUS.UPCOMING:
        return `D-${calcDDay(from)}`;
      case TRAVEL_STATUS.LAST:
        return '';
      default:
        return '';
    }
  }, [status]);

  return (
    <div className="flex gap-0.5 font-bold">
      <p className={cn(getStatusColor)}>{getStatusLabel}</p>
      <span className="text-text-secondary">{getStatusBadge}</span>
    </div>
  );
}
