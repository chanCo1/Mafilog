/**
 * @file: TravelTimelineWrap.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 타임라인 리스트 컴포넌트
 */

import { useState } from 'react';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import TimelineCard from '@/features/myPage/components/timeline/TimelineCard';
import TimelineStatisticModal from '@/features/myPage/components/timeline/modal/TimelineStatisticModal';
import { useGetMyTimelineList } from '@/features/myPage/hooks/rquery/useGetMyTimelineList';

interface ITravelTimelineWrap {}

export default function TravelTimelineWrap() {
  const { data: myTimelineList } = useGetMyTimelineList();

  const [isOpenStatisticModal, setIsOpenStatisticModal] = useState(false);

  const handleTimeline = () => {
    // setSelectedTimeline(1);

    if (window.innerWidth >= 1023) return;
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
          <div className="w-full pb-3" onClick={() => handleTimeline()}>
            <TimelineCard isSelected={true} index={myTimelineList.length - index} list={_list} />
          </div>
        </div>
      ))}
      <TimelineStatisticModal
        isOpen={isOpenStatisticModal}
        handleClose={() => setIsOpenStatisticModal(false)}
      />
    </div>
  );
}
