/**
 * @file: TravelScheduleView.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelScheduleView 컴포넌트, 여행 일정탭 하위 내용
 */

import { memo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import TravelScheduleDay from '@/features/myTravel/components/detail/schedule/TravelScheduleDay';
import { Chip } from '@/shared/components/ui/Chip';
import GoogleMap from '@/shared/components/map/GoogleMap';
import AddPlaceModal from '@/features/myTravel/components/modal/AddPlaceModal';
import { useTravelStore } from '@/shared/stores/useTravelStore';
import AddMemoModal from '@/features/myTravel/components/modal/AddMemoModal';
import { useSelectSchedules } from '@/features/myTravel/store/useSelectSchedules';

function TravelScheduleView() {
  const schedules = useTravelStore((state) => state.schedules);
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
                  <Button variant="gray" size="sm">
                    선택 날짜 이동
                  </Button>
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
          <div className="max-mobile:h-60 h-110">
            <div className="h-full w-full bg-red-50" />
            {/* <GoogleMap /> */}
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

export default memo(TravelScheduleView);
