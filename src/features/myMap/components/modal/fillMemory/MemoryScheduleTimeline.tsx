/**
 * @file: MemoryScheduleTimeline.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: MemoryScheduleTimeline 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { Card } from '@/shared/components/ui/Card';
import { Textarea } from '@/shared/components/ui/Textarea';
import { IScheduleList } from '@/shared/interfaces/travelScheduleStore.interface';
import { useTimelineDiscplayCount } from '@/features/myTravel/hooks/useTimelineDiscplayCount';
import { getPlaceCategory } from '@/shared/lib/utils';
import RatingStar from '@/shared/components/ui/RatingStar';

interface IMemoryScheduleTimeline {
  timeLineData: IScheduleList;
  dailyAllSchedule: IScheduleList[];
  currentIndex: number;
}

export default function MemoryScheduleTimeline({
  timeLineData,
  currentIndex,
  dailyAllSchedule,
}: IMemoryScheduleTimeline) {
  const displayCount = useTimelineDiscplayCount({
    currentIndex,
    dailyAllSchedule,
    type: timeLineData?.type,
  });

  const _place = timeLineData?.place;

  const [rating, setRating] = useState(0);

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {timeLineData.type === SCHEDULE_TYPE.PLACE ? (
            <CircledNumber number={displayCount} />
          ) : (
            <CategoryIcon variant="memo" />
          )}
        </div>
        <div className="border-border-primary w-px flex-1 border border-dashed" />
      </div>
      <div className="w-full pb-2.5">
        <Card>
          {timeLineData.type === SCHEDULE_TYPE.PLACE ? (
            <div className="flex flex-col gap-1">
              <div className='flex flex-col'>
                <span className="text-lg font-bold">
                  {timeLineData.place?.name}
                </span>
                {_place && (
                  <span className="text-text-secondary text-sm">
                    {<>{getPlaceCategory(_place.types)}</>}
                    {_place.country.name && (
                      <>&nbsp;&#8226;&nbsp;{_place.country.name}</>
                    )}
                  </span>
                )}
              </div>
              <RatingStar value={rating} onChange={setRating} />
              <Textarea />
            </div>
          ) : (
            <span className="text-text-secondary">{timeLineData.memo}</span>
          )}
        </Card>
      </div>
    </div>
  );
}
