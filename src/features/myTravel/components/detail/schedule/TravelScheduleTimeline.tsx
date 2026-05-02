/**
 * @file: TravelScheduleTimeline.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelScheduleTimeline 컴포넌트, 여행 일정/지출 타임라인
 */

import { useState, useMemo, MouseEvent } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { SCHEDULE_TYPE, ICON_TYPE } from '@/shared/types/Enum';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { Button } from '@/shared/components/ui/Button';
import { IScheduleList } from '@/shared/interfaces';

interface ITravelScheduleTimeline {
  timeLineData?: IScheduleList;
}

export default function TravelScheduleTimeline({
  timeLineData,
}: ITravelScheduleTimeline) {
  /** 메모를 제외한 일정 카운트 */
  // const getDisplayCount = useMemo(() => {
  //   if (timeLineData?.type !== SCHEDULE_TYPE.PLACE) return;

  //   const sliced = allSchedules?.slice(0, count! + 1);

  //   const filltered = sliced.filter((schedule) => {
  //     return schedule.type === SCHEDULE_TYPE.PLACE
  //   });

  //   return filltered.length;
  // }, [timeLineData?.type, allSchedules, count]);

  /** 일정 삭제 핸들러 */
  const handleDeleteSchedule = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('삭제!!!');
  };

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {timeLineData?.type &&
            (timeLineData.type === SCHEDULE_TYPE.PLACE ? (
              <CircledNumber number="1" />
            ) : (
              <CategoryIcon variant="memo" />
            ))}
          {!timeLineData?.type && <CategoryIcon variant="plus" />}
        </div>
        <div className="border-border-primary w-px flex-1 border border-dashed" />
      </div>
      <div className="w-full pb-2.5">
        {timeLineData?.type ? (
          <>
            {timeLineData?.type === SCHEDULE_TYPE.PLACE ? (
              <div>
                <span className="text-sm font-bold">{timeLineData.time}</span>
                <Card>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">
                        {timeLineData.place?.name}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {timeLineData.place?.address}
                      </span>
                    </div>
                    <Button
                      className="shrink-0"
                      variant="redOutline"
                      size="xs"
                      onClick={(e) => handleDeleteSchedule(e)}
                    >
                      삭제
                    </Button>
                  </div>
                </Card>
                <div className="flex justify-end">
                  <span className="text-text-secondary text-sm">
                    {timeLineData.memo}
                  </span>
                </div>
              </div>
            ) : (
              <Card>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-text-secondary">
                    {timeLineData.memo}
                  </span>
                  <Button
                    className="shrink-0"
                    variant="redOutline"
                    size="xs"
                    onClick={(e) => handleDeleteSchedule(e)}
                  >
                    삭제
                  </Button>
                </div>
              </Card>
            )}
          </>
        ) : (
          <Card
            variant="dashed"
            className="flex flex-col items-start justify-center"
            disabled
          >
            <div className="text-text-primary w-full text-center text-sm">
              일정이 없습니다.
              <br />
              장소를 추가하고 멋진 여행을 해보세요!
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
