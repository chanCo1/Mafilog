/**
 * @file: TravelScheduleView.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelScheduleView 컴포넌트, 여행 일정탭 하위 내용
 */

import { useMemo, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import TravelScheduleDay from '@/features/myTravel/components/detail/schedule/TravelScheduleDay';
import { Chip } from '@/shared/components/ui/Chip';
import GoogleMap from '@/shared/components/map/GoogleMap';
import AddPlaceModal from '@/features/myTravel/components/modal/AddPlaceModal';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import AddMemoModal from '@/features/myTravel/components/modal/AddMemoModal';
import { useSelectSchedules } from '@/features/myTravel/store/useSelectSchedules';
import Dropdown from '@/shared/components/ui/Dropdown';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';

function TravelScheduleView() {
  const schedules = useTravelScheduleStore((state) => state.schedules);
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const { clearSelectedSchedules } = useSelectSchedules();
  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });

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
    const targetDay = schedules.find((s) => s.day === selectedDay);

    if (!targetDay) return [];

    const places = targetDay.list
      .filter((item) => item.type === 'place' && !!item.place)
      .map((item) => item.place as IPlaceList);

    return places.length > 0 ? places : [];
  }, [schedules, selectedDay]);

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
                    {travelDaysList.map((list) => (
                      <span
                        key={list.value}
                        className={cn(
                          'hover:bg-gray-1 text-text-secondary cursor-pointer rounded-md p-1.5',
                        )}
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
                    onClick={() => setIsOpenAddPlaceModal(true)}
                  >
                    장소 추가
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsOpenAddMemoModal(true)}
                  >
                    메모 추가
                  </Button>
                </>
              )}
            </div>
          </>
        }
        dayTimelines={
          <>
            {schedules.map((_day, index) => {
              return (
                <TravelScheduleDay
                  key={`${_day.day}-${index}`}
                  day={_day.day}
                  date={_day.date}
                  list={_day.list}
                  selectMode={selectModifyMode}
                />
              );
            })}
          </>
        }
        dayButtons={
          <>
            {schedules.map((_day, index) => (
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
      />
      <AddMemoModal
        isOpen={isOpenAddMemoModel}
        handleClose={() => setIsOpenAddMemoModal(false)}
      />
    </>
  );
}

export default TravelScheduleView;
