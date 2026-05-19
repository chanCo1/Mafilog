/**
 * @file: TravelScheduleView.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: 여행 일정 뷰
 */

import { useMemo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import TravelScheduleDay from '@/features/myTravel/components/detail/schedule/TravelScheduleDay';
import { Chip } from '@/shared/components/ui/Chip';
import GoogleMap from '@/shared/components/map/GoogleMap';
import AddPlaceModal from '@/features/myTravel/components/modal/AddPlaceModal';
import AddMemoModal from '@/features/myTravel/components/modal/AddMemoModal';
import { useSelectSchedules } from '@/features/myTravel/store/useSelectSchedules';
import Dropdown from '@/shared/components/ui/Dropdown';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';

import { useFetchTravelSchedules } from '@/features/myTravel/hooks/rquery/useFetchTravelSchedules';
import { useParams } from 'next/navigation';
import { getTravelDayList } from '@/shared/lib/utils';

interface ITravelScheduleView {
  from: Date;
  to: Date;
}

function TravelScheduleView({ from, to }: ITravelScheduleView) {
  const params = useParams();
  const { data: scheduleList } = useFetchTravelSchedules(
    params.travelId as string,
  );

  const { clearSelectedSchedules } = useSelectSchedules();

  /** 일정 선택 */
  const [selectedDay, setSelectedDay] = useState(1);
  /** 선택 수정 모드 */
  const [selectModifyMode, setSelectModifyMode] = useState(false);

  const [isOpenAddPlaceModel, setIsOpenAddPlaceModal] = useState(false);
  const [isOpenAddMemoModel, setIsOpenAddMemoModal] = useState(false);

  const handleModifyMode = () => {
    if (selectModifyMode) {
      setSelectModifyMode(false);
      clearSelectedSchedules();
    } else {
      setSelectModifyMode(true);
    }
  };

  const getPlace = useMemo(() => {
    const targetDay = scheduleList?.find((s) => s.day === selectedDay);

    if (!targetDay) return [];

    const places = targetDay.scheduleList
      .filter((item) => item.type === 'place' && !!item.place)
      .map((item) => item.place as IPlaceList);

    return places.length > 0 ? places : [];
  }, [scheduleList, selectedDay]);

  if (!scheduleList?.length) return;

  return (
    <>
      <TravelDetailTemplate
        handleButtons={
          <>
            <Button variant="gray" size="sm" onClick={handleModifyMode}>
              {selectModifyMode ? '돌아가기' : '선택 수정'}
            </Button>
            <div className="flex gap-1">
              {selectModifyMode ? (
                <>
                  <Dropdown
                    trigger={
                      <Button variant="gray" size="sm">
                        선택 날짜 이동
                      </Button>
                    }
                  >
                    {getTravelDayList(scheduleList).map((list) => (
                      <span
                        key={list.value}
                        className="hover:bg-gray-1 text-text-secondary cursor-pointer rounded-md p-1.5"
                        onClick={() => console.log(list)}
                      >
                        {list.label}
                      </span>
                    ))}
                  </Dropdown>
                  <Button variant="redOutline" size="sm">
                    선택 삭제
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsOpenAddMemoModal(true)}
                  >
                    메모 추가
                  </Button>
                  <Button
                    className="w-35"
                    // className="w-35 bg-linear-to-r from-secondary to-primary"
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsOpenAddPlaceModal(true)}
                  >
                    장소 추가
                  </Button>
                </>
              )}
            </div>
          </>
        }
        dayTimelines={
          <>
            {scheduleList?.map((schedule, index) => {
              return (
                <TravelScheduleDay
                  key={`${schedule.day}-${index}`}
                  schedule={schedule}
                  selectMode={selectModifyMode}
                />
              );
            })}
          </>
        }
        dayButtons={
          <>
            {scheduleList?.map((_day, index) => (
              <Chip
                key={`${_day.day}-${index}`}
                size="md"
                className="shrink-0"
                variant={
                  selectedDay === _day.day ? 'primary' : 'primaryOutline'
                }
                onClick={() => setSelectedDay(_day.day)}
              >{`${_day.day}일차`}</Chip>
            ))}
          </>
        }
        stautsArea={
          <div className="max-mobile:h-60 h-110 overflow-hidden rounded-lg">
            {/* <GoogleMap
              places={getPlace}
              id={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string}
            /> */}
          </div>
        }
      />
      <AddPlaceModal
        isOpen={isOpenAddPlaceModel}
        handleClose={() => setIsOpenAddPlaceModal(false)}
        scheduleList={scheduleList}
      />
      <AddMemoModal
        isOpen={isOpenAddMemoModel}
        handleClose={() => setIsOpenAddMemoModal(false)}
        scheduleList={scheduleList}
      />
    </>
  );
}

export default TravelScheduleView;
