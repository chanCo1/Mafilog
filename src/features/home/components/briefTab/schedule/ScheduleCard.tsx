/**
 * @file: ScheduleCard.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: ScheduleCard 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { SCHEDULE_MOCK_DATA } from '@/features/home/constants';
import { useTimelineDiscplayCount } from '@/features/myTravel/hooks/useTimelineDiscplayCount';

interface IScheduleCard {
  name: string;
  type: string;
  category?: string;
  country?: string;
  city?: string;
  count?: number;
  allSchedules: SCHEDULE_MOCK_DATA[];
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
  const displayCount = useTimelineDiscplayCount({
    currentIndex: count,
    // TODO: 타입 안맞는것 수정할 것
    dailyAllSchedule: allSchedules,
    type: type as SCHEDULE_TYPE,
  });

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {type === SCHEDULE_TYPE.PLACE ? (
            <CircledNumber number={displayCount} />
          ) : (
            <CategoryIcon variant="memo" />
          )}
        </div>
        <div className="border-primary w-px flex-1 border border-dashed" />
      </div>
      <div className="w-full pb-2.5">
        <Card
          variant="shadowedWhite"
          className="flex flex-col items-start justify-center"
        >
          <p
            className={cn(
              type === SCHEDULE_TYPE.PLACE
                ? 'text-lg font-bold'
                : 'text-text-secondary text-sm',
            )}
          >
            {name}
          </p>
          {type === SCHEDULE_TYPE.PLACE ? (
            <div className="text-text-secondary text-sm">
              <span>{category}</span>&nbsp;&#8226;&nbsp;
              <span>{city}</span>&nbsp;&#8226;&nbsp;
              {country && <span>{country}</span>}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};
