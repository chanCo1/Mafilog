/**
 * @file: TravelScheduleView.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelScheduleView 컴포넌트, 여행 일정탭 하위 내용
 */

import { memo, useMemo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import { getTravelDay } from '@/shared/lib/utils';
import TravelScheduleDay from '@/features/myTravel/components/detail/schedule/TravelScheduleDay';
import { Chip } from '@/shared/components/ui/Chip';
import GoogleMap from '@/shared/components/map/GoogleMap';
import AddPlaceModal from '@/features/myTravel/components/modal/AddPlaceModal';
import { getTravelDayOfWeek } from '@/shared/lib/utils';

interface ITravelScheduleView {
  from: Date;
  to: Date;
}

function TravelScheduleView({ from, to }: ITravelScheduleView) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isOpenAddPlaceModel, setIsOpenAddPlaceModal] = useState(false);

  /** 여행 일수 */
  const travelDays = useMemo(() => {
    return getTravelDay(from, to);
  }, [from, to]);

  return (
    <>
      <TravelDetailTemplate
        handleButtons={
          <>
            <Button variant="gray" size="sm">
              선택 수정
            </Button>
            <div className="flex gap-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsOpenAddPlaceModal(true)}
              >
                장소 추가
              </Button>
              <Button variant="secondary" size="sm">
                메모 추가
              </Button>
            </div>
          </>
        }
        dayTimelines={
          <>
            {getTravelDayOfWeek(from, to).map((_day, index) => {
              return (
                <TravelScheduleDay
                  key={`${_day.day}-${index}`}
                  day={_day.day}
                  date={_day.date}
                  // schedule={TRAVEL_DETAIL_MOCK_DATA.schedule}
                />
              );
            })}
          </>
        }
        dayButtons={
          <>
            {getTravelDayOfWeek(from, to).map((_day, index) => (
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
        from={from}
        to={to}
        handleClose={() => setIsOpenAddPlaceModal(false)}
      />
    </>
  );
}

export default memo(TravelScheduleView);
