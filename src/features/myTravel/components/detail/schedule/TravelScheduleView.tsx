/**
 * @file: TravelScheduleView.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelScheduleView 컴포넌트, 여행 일정탭 하위 내용
 */

import { memo, useState } from 'react';
import TravelDetailTemplate from '@/features/myTravel/components/detail/TravelDetailTemplate';
import { Button } from '@/shared/components/ui/Button';
import { getTravelDay } from '@/shared/lib/utils';
import TravelScheduleDay from '@/features/myTravel/components/detail/schedule/TravelScheduleDay';
import { Chip } from '@/shared/components/ui/Chip';
import GoogleMap from '@/shared/components/map/GoogleMap';
import AddPlaceModal from '@/features/myTravel/components/modal/AddPlaceModal';

interface ITravelScheduleView {
  from: Date;
  to: Date;
}

function TravelScheduleView({ from, to }: ITravelScheduleView) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isOpenAddPlaceModel, setIsOpenAddPlaceModal] = useState(false);

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
            {Array.from({ length: getTravelDay(from, to) }).map((_, index) => {
              const _day = index + 1;
              const dupDate = new Date(from);
              dupDate.setDate(from.getDate() + index);

              return (
                <TravelScheduleDay
                  key={`${dupDate}-${index}`}
                  day={_day}
                  date={dupDate}
                  // schedule={TRAVEL_DETAIL_MOCK_DATA.schedule}
                />
              );
            })}
          </>
        }
        dayButtons={
          <>
            {Array.from({ length: getTravelDay(from, to) }).map((_, index) => (
              <Chip
                key={index}
                size="md"
                className="shrink-0"
                variant={
                  selectedDay === index + 1 ? 'primary' : 'primaryOutline'
                }
                onClick={() => setSelectedDay(index + 1)}
              >{`${index + 1}일차`}</Chip>
            ))}
          </>
        }
        stautsArea={
          <div className="max-mobile:h-60 h-110">
            <div className='w-full h-full bg-red-50' /> 
            {/* <GoogleMap /> */}
          </div>
        }
      />
      <AddPlaceModal
        isOpen={isOpenAddPlaceModel}
        handleClose={() => setIsOpenAddPlaceModal(false)}
      />
    </>
  );
}

export default memo(TravelScheduleView);
