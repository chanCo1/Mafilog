/**
 * @file: TravelTimelineWrap.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 타임라인 리스트 컴포넌트
 */

import { Dispatch, SetStateAction, useState } from 'react';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import TimelineCard from '@/features/myPage/components/timeline/TimelineCard';
import TimelineStatisticModal from '@/features/myPage/components/timeline/modal/TimelineStatisticModal';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';
import { useDevice } from '@/shared/hooks/useDevice';

interface ITravelTimelineWrap {
  myTimelineList: IMyTravelListResponse[];
  selectedTimeline: IMyTravelListResponse | null;
  setSelectedTimeline: Dispatch<SetStateAction<IMyTravelListResponse | null>>;
}

export default function TravelTimelineWrap({
  myTimelineList,
  selectedTimeline,
  setSelectedTimeline,
}: ITravelTimelineWrap) {
  const [isOpenStatisticModal, setIsOpenStatisticModal] = useState(false);
  const { isDesktop } = useDevice();

  const handleTimeline = (travel: IMyTravelListResponse) => {
    setSelectedTimeline(travel);

    if (isDesktop) return;
    setIsOpenStatisticModal(true);
  };

  return (
    <div className="flex flex-col">
      {myTimelineList?.map((_list, index) => (
        <div className="flex w-full gap-3" key={_list.id}>
          <div className="flex flex-col items-center">
            <div className="shrink-0">
              <CategoryIcon
                variant={_list.travelType === 'world' ? 'plane' : 'bus'}
              />
            </div>
            <div className="border-border-primary w-px flex-1 border" />
          </div>
          <div className="w-full pb-3" onClick={() => handleTimeline(_list)}>
            <TimelineCard
              isSelected={_list.id === selectedTimeline?.id}
              index={myTimelineList.length - index}
              list={_list}
            />
          </div>
        </div>
      ))}
      <TimelineStatisticModal
        isOpen={isOpenStatisticModal}
        handleClose={() => setIsOpenStatisticModal(false)}
        selectedTimeline={selectedTimeline!}
      />
    </div>
  );
}
