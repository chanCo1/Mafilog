/**
 * @file: FillMemoryDetailModal.tsx
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 추억 상세 모달
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/Button';
import { SideModal } from '@/shared/components/ui/SideModal';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { useGetMemoryDetail } from '@/features/myMap/hooks/rquery/useGetMemoryDetail';
import GoogleMap from '@/shared/components/map/GoogleMap';
import EmblaCarousel from '@/shared/components/ui/EmblaCarousel';
import { convertTravelDateRange } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { Chip } from '@/shared/components/ui/Chip';
import MemoryScheduleDay from '@/features/myMap/components/modal/fillMemory/MemoryScheduleDay';

interface IFillMemoryDetailModal {
  isOpen: boolean;
  handleClose: () => void;
  selectedMapId: string | undefined;
}

export default function FillMemoryDetailModal({
  handleClose,
  isOpen,
  selectedMapId,
}: IFillMemoryDetailModal) {
  const [selectedDay, setSelectedDay] = useState(1);

  const { openDialog } = useDialogStore();
  const { data: memoryDetail } = useGetMemoryDetail(selectedMapId ?? '');
  console.log('memoryDetail >> ', memoryDetail);

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
  };

  /** 여행 삭제 */
  const handelDeleteMemory = () => {
    openDialog({
      type: 'confirm',
      message: '추억을 삭제할까요?',
      okLabel: '삭제',
      // onOk: async () => {
      //   await deleteMyTravel(travelId);
      //   router.push('/my-travel');
      // },
    });
  };

  const filteredSchedule = memoryDetail?.schedules?.filter(
    (schedule) => schedule.day === selectedDay,
  );

  return (
    <SideModal
      isOpen={isOpen}
      title={memoryDetail?.title}
      handleClose={onClickCloseBtn}
      footer={
        <div className={cn('flex w-full justify-between gap-1')}>
          <Button variant="redOutline" onClick={handelDeleteMemory}>
            삭제
          </Button>
          <div className="flex gap-1">
            <Button variant="gray" onClick={onClickCloseBtn}>
              닫기
            </Button>
            <Button
            // disabled={!selectedCities.length}
            // onClick={handelNextStep}
            >
              수정
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex h-full overflow-auto scrollbar-hide flex-col gap-5">
        {memoryDetail?.imageUrl.length ? (
          <EmblaCarousel imageUrls={memoryDetail.imageUrl} />
        ) : null}

        <div className="flex flex-col gap-2">
          {memoryDetail?.scheduleTitle && (
            <h5 className="text-lg font-bold">{memoryDetail?.scheduleTitle}</h5>
          )}
          <span>
            {convertTravelDateRange(memoryDetail?.from, memoryDetail?.to)}
          </span>
          {memoryDetail?.memo && <Card>{memoryDetail.memo}</Card>}
        </div>

        <div className="flex flex-col gap-2 h-full">
          {memoryDetail && (
            <div className="scrollbar-hide flex gap-1 overflow-x-auto shrink-0">
              {memoryDetail?.schedules.map((_day, index) => (
                <Chip
                  key={`${_day.day}-${index}`}
                  size="md"
                  variant={
                    selectedDay === _day.day ? 'primary' : 'primaryOutline'
                  }
                  onClick={() => setSelectedDay(_day.day)}
                >{`${_day.day}일차`}</Chip>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-3">
            {filteredSchedule?.map((schedule, index) => (
              <MemoryScheduleDay
                key={`${schedule.day}-${index}`}
                schedule={schedule}
                readonly
              />
            ))}
          </div>
        </div>
      </div>
    </SideModal>
  );
}
