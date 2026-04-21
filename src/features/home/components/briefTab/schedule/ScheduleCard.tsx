/**
 * @file: ScheduleCard.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: ScheduleCard 컴포넌트
 */

import { useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

interface IScheduleCard {
  name: string;
  type: string;
  category?: string;
  country?: string;
  city?: string;
  count?: number;
  // TODO: 타입 정의할 것
  allSchedules: any[];
}

/** 일정 카드 컴포넌트 */
export const ScheduleCard = ({
  name,
  category,
  city,
  country,
  type,
  count,
  allSchedules,
}: IScheduleCard) => {
  /** 메모를 제외한 일정 카운트 */
  const getDisplayCount = useMemo(() => {
    if (type !== SCHEDULE_TYPE.LOCATION) return;

    return allSchedules
      ?.slice(0, count === 0 ? count + 1 : count)
      .filter((schedule) => schedule !== SCHEDULE_TYPE.LOCATION).length;
  }, [type, allSchedules, count]);

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {type === SCHEDULE_TYPE.LOCATION ? (
            <CircledNumber number={getDisplayCount!} />
          ) : (
            <CategoryIcon variant="memo" />
          )}
        </div>
        <div className="border-primary w-px flex-1 border border-dashed" />
      </div>
      <div className="w-full pb-2.5">
        <Card
          variant="shadowed"
          className="flex flex-col items-start justify-center"
        >
          <p
            className={cn(
              type === SCHEDULE_TYPE.LOCATION
                ? 'text-lg font-bold'
                : 'text-text-secondary text-sm',
            )}
          >
            {name}
          </p>
          <div className="text-text-secondary text-sm">
            {category && (
              <>
                <span>{category}</span>&nbsp;&#8226;&nbsp;
              </>
            )}
            {city && (
              <>
                <span>{city}</span>&nbsp;&#8226;&nbsp;
              </>
            )}
            {country && <span>{country}</span>}
          </div>
        </Card>
      </div>
    </div>
  );
};
