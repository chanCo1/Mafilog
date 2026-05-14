/**
 * @file: TravelTimelineWrap.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: TravelTimelineWrap 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import TimelineCard from '@/features/myPage/components/timeline/TimelineCard';
import TimelineStatisticModal from '@/features/myPage/components/timeline/modal/TimelineStatisticModal';

interface ITravelTimelineWrap {}

export default function TravelTimelineWrap() {
  const [selectedTimeline, setSelectedTimeline] = useState(1);
  const [isOpenStatisticModal, setIsOpenStatisticModal] = useState(false);

  const handleTimeline = () => {
    setSelectedTimeline(1);

    if (window.innerWidth >= 1023) return;
    setIsOpenStatisticModal(true);
  };

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {/* {timeLineData?.type &&
            (timeLineData.type === SCHEDULE_TYPE.PLACE ? (
              <CircledNumber number={displayCount} />
            ) : (
              <CategoryIcon variant="memo" />
            ))}
          {!timeLineData?.type && <CategoryIcon variant="plus" />} */}
          <CategoryIcon variant="plane" />
        </div>
        <div className="border-border-primary w-px flex-1 border" />
      </div>
      <div className="w-full pb-3" onClick={() => handleTimeline()}>
        <TimelineCard isSelected={true} />
      </div>

      <TimelineStatisticModal
        isOpen={isOpenStatisticModal}
        handleClose={() => setIsOpenStatisticModal(false)}
      />
    </div>
  );
}
