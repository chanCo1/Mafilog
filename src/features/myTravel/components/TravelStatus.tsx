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

interface ITravelStatus {
  status: string;
  from: Date;
  to: Date;
}

export default function TravelStatus({ status, from, to }: ITravelStatus) {
  /** 상태 라벨 */
  const getStatusLabel = useMemo(() => {
    const _status = TRAVEL_STATUS_LIST.find((list) => list.value === status);

    return _status?.label;
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

  // TODO: 몇 일차인지 계산!
  const getStatusBadge = useMemo(() => {
    switch (status) {
      case TRAVEL_STATUS.PROGRESS:
        return 'text-state-info';
      case TRAVEL_STATUS.UPCOMING:
        return `D-${calcDDay(from)}`;
      case TRAVEL_STATUS.LAST:
        return '';
      default:
        return '';
    }
  }, []);

  return (
    <div className="flex gap-0.5">
      <p className={cn(getStatusColor, 'font-bold')}>{getStatusLabel} 여행</p>
      <span className="text-text-secondary text-sm font-bold">{getStatusBadge}</span>
    </div>
  );
}
