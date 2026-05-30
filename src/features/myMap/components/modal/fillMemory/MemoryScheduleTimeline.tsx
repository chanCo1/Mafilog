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
import { useTimelineDiscplayCount } from '@/features/myTravel/hooks/useTimelineDiscplayCount';
import { getPlaceCategory } from '@/shared/lib/utils';
import RatingStar from '@/shared/components/ui/RatingStar';
import { IScheduleListWithRating } from '@/features/myTravel/interfaces/schedule.interface';
import { IHandleUpdateSchedule } from '@/features/myMap/interfaces/memory.interface';
import { IMemoryScheduleList } from '@/features/myMap/interfaces/memory.interface';

interface IMemoryScheduleTimeline {
  timeLineData: IMemoryScheduleList;
  dailyAllSchedule: IMemoryScheduleList[];
  currentIndex: number;
  onUpdateSchedule?: ({
    day,
    key,
    listId,
    value,
  }: IHandleUpdateSchedule) => void;
  readonly?: boolean;
}

export default function MemoryScheduleTimeline({
  timeLineData,
  currentIndex,
  dailyAllSchedule,
  onUpdateSchedule,
  readonly,
}: IMemoryScheduleTimeline) {
  const displayCount = useTimelineDiscplayCount({
    currentIndex,
    dailyAllSchedule: dailyAllSchedule as IScheduleListWithRating[],
    type: timeLineData?.type,
  });

  const _place = timeLineData?.place;

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
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  {timeLineData.place?.name}
                </span>
                {_place && (
                  <span className="text-text-secondary text-sm">
                    {<>{getPlaceCategory(_place.types)}</>}
                    {_place.countryName && (
                      <>&nbsp;&#8226;&nbsp;{_place.countryName}</>
                    )}
                  </span>
                )}
              </div>
              <RatingStar
                value={timeLineData.rating}
                onChange={(newRating) =>
                  onUpdateSchedule?.({
                    day: timeLineData.day,
                    key: 'rating',
                    value: newRating,
                    listId: timeLineData.id,
                  })
                }
                readonly={readonly}
              />
              {(!readonly || timeLineData.memo) && (
                <Textarea
                  value={timeLineData.memo || ''}
                  onChange={(e) =>
                    onUpdateSchedule?.({
                      day: timeLineData.day,
                      key: 'memo',
                      value: e.target.value,
                      listId: timeLineData.id,
                    })
                  }
                  variant={readonly ? 'none' : 'default'}
                  readonly={readonly}
                />
              )}
            </div>
          ) : (
            <span className="text-text-secondary">{timeLineData.memo}</span>
          )}
        </Card>
      </div>
    </div>
  );
}
