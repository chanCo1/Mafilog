/**
 * @file: TimelineStatisticModal.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 타임라인 통계 모달 (모바일 전용)
 */

import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import TimelineStatistic from '@/features/myPage/components/timeline/TimelineStatistic';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';

interface ITimelineStatisticModal {
  isOpen: boolean;
  handleClose: () => void;
  selectedTimeline: IMyTravelListResponse;
}

export default function TimelineStatisticModal({
  isOpen,
  handleClose,
  selectedTimeline,
}: ITimelineStatisticModal) {
  return (
    <SideModal
      isOpen={isOpen}
      title="통계"
      handleClose={handleClose}
      footer={
        <Button variant="gray" onClick={handleClose}>
          닫기
        </Button>
      }
    >
      <div className="scrollbar-hide flex h-full flex-col overflow-auto">
        <TimelineStatistic selectedTimeline={selectedTimeline} />
      </div>
    </SideModal>
  );
}
