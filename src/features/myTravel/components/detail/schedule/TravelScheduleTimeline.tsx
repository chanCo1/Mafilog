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
import { useTimelineDiscplayCount } from '@/features/myTravel/hooks/useTimelineDiscplayCount';
import PlaceDetailModal from '@/features/myTravel/components/modal/PlaceDetailModal';
import { getPlaceCategory } from '@/shared/lib/utils';
import TravelTimelineCard from '@/features/myTravel/components/detail/TravelTimelineCard';
import { useSelectSchedules } from '@/features/myTravel/store/useSelectSchedules';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { ISecheduleListResponse } from '@/features/myTravel/interfaces/schedule.interface';
import { useDeleteSchedulePlace } from '@/features/myTravel/hooks/rquery/useDeleteSchedulePlace';
import { useParams } from 'next/navigation';

interface ITravelScheduleTimeline {
  timeLineData?: ISecheduleListResponse;
  dailyAllSchedule?: ISecheduleListResponse[];
  currentIndex?: number;
  selectMode?: boolean;
}

export default function TravelScheduleTimeline({
  timeLineData,
  dailyAllSchedule,
  currentIndex,
  selectMode,
}: ITravelScheduleTimeline) {
  const displayCount = useTimelineDiscplayCount({
    currentIndex,
    dailyAllSchedule,
    type: timeLineData?.type,
  });

  const params = useParams();
  const { mutateAsync: deleteSchedule } = useDeleteSchedulePlace(
    params.travelId as string,
    timeLineData?.type!,
  );
  const { selectedSchedules, toggleSelect } = useSelectSchedules();
  const { openDialog } = useDialogStore();

  const [isOpenDatilModal, setIsOpenDatilModal] = useState(false);

  const isSelected = selectedSchedules.some(
    (schedule) => schedule.id === timeLineData?.id,
  );

  /** 일정 삭제 핸들러 */
  const handleDeleteSchedule = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (timeLineData?.day === undefined || currentIndex === undefined) return;
    const isPlace = timeLineData?.type === SCHEDULE_TYPE.PLACE;

    openDialog({
      message: `${isPlace ? '장소' : '메모'}를 삭제할까요?`,
      type: 'confirm',
      okLabel: '삭제',
      onOk: async () => {
        await deleteSchedule({
          travelId: params.travelId as string,
          deleteIds: [timeLineData.id],
        });
      },
    });
  };

  /** 카드 클릭 */
  const onClickCard = () => {
    if (selectMode && timeLineData) {
      toggleSelect(timeLineData); // 선택 모드일 땐 토글만
    } else {
      setIsOpenDatilModal(true); // 아닐 땐 모달
    }
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
        {timeLineData ? (
          <>
            {timeLineData.type === SCHEDULE_TYPE.PLACE ? (
              <TravelTimelineCard
                time={timeLineData.time!}
                memo={timeLineData.memo!}
                onClickCard={onClickCard}
                onClickDelete={(e) => handleDeleteSchedule(e)}
                selectMode={selectMode!}
                isSelected={isSelected}
              >
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
              </TravelTimelineCard>
            ) : (
              <TravelTimelineCard
                time={timeLineData.time!}
                memo={timeLineData.memo!}
                onClickCard={onClickCard}
                onClickDelete={(e) => handleDeleteSchedule(e)}
                selectMode={selectMode!}
                isMemo
                isSelected={isSelected}
              >
                <span className="text-text-secondary">{timeLineData.memo}</span>
              </TravelTimelineCard>
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
      <PlaceDetailModal
        isOpen={isOpenDatilModal}
        handleClose={() => setIsOpenDatilModal(false)}
        timeLineData={timeLineData}
      />
    </div>
  );
}
