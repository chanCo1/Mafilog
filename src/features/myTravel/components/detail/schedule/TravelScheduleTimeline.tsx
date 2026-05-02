/**
 * @file: TravelScheduleTimeline.tsx
 * @author: chad
 * @since: 2026.04.28 ~
 * @description: TravelScheduleTimeline 컴포넌트, 여행 일정/지출 타임라인
 */

import { MouseEvent, useState } from 'react';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { Button } from '@/shared/components/ui/Button';
import { IScheduleList } from '@/shared/interfaces';
import { useTimelineDiscplayCount } from '@/features/myTravel/hooks/useTimelineDiscplayCount';
import { toast } from 'sonner';
import { useTravelStore } from '@/shared/stores/useTravelStore';
import PlaceDeatilModal from '@/features/myTravel/components/modal/PlaceDeatilModal';
import { getPlaceCategory } from '@/shared/lib/utils';

interface ITravelScheduleTimeline {
  timeLineData?: IScheduleList;
  dailyAllSchedule?: IScheduleList[];
  currentIndex?: number;
  day?: number;
}

export default function TravelScheduleTimeline({
  timeLineData,
  dailyAllSchedule,
  currentIndex,
  day,
}: ITravelScheduleTimeline) {
  const displayCount = useTimelineDiscplayCount({
    currentIndex,
    dailyAllSchedule,
    type: timeLineData?.type,
  });
  const setDeleteScheduleList = useTravelStore(
    (state) => state.setDeleteScheduleList,
  );

  const [isOpenDatilModal, setIsOpenDatilModal] = useState(false);

  /** 일정 삭제 핸들러 */
  const handleDeleteSchedule = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (day === undefined || currentIndex === undefined) return;
    const isPlace = timeLineData?.type === SCHEDULE_TYPE.PLACE;

    try {
      setDeleteScheduleList({ day, index: currentIndex });
    } catch (error) {
      console.log(error);
    }

    toast.success(`${isPlace ? '장소' : '메모'}를 삭제했어요`);
  };

  const onClickPlace = () => {
    setIsOpenDatilModal(true);
  };

  const _place = timeLineData?.place;

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {timeLineData?.type &&
            (timeLineData.type === SCHEDULE_TYPE.PLACE ? (
              <CircledNumber number={displayCount} />
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
                <Card className="cursor-pointer" onClick={onClickPlace}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">
                        {timeLineData.place?.name}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {<>{getPlaceCategory(_place?.types!)}</>}
                        {_place?.country.name && (
                          <>&nbsp;&#8226;&nbsp;{_place.country.name}</>
                        )}
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
              <Card className="cursor-pointer" onClick={onClickPlace}>
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
      <PlaceDeatilModal
        isOpen={isOpenDatilModal}
        handleClose={() => setIsOpenDatilModal(false)}
        data={timeLineData}
        day={day}
      />
    </div>
  );
}
