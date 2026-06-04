/**
 * @file: FillMemoryDetailModal.tsx
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 추억 상세 모달
 */

import { useState, useMemo, Dispatch, SetStateAction } from 'react';
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
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { useDeleteMemory } from '@/features/myMap/hooks/rquery/useDeleteMemory';

interface IFillMemoryDetailModal {
  isOpen: boolean;
  handleClose: () => void;
  selectedMemoryId: number;
  setSelectedMemoryId: (id: number) => void;
  selectedMapType: string | undefined;
  handleUpdate: (() => void) | undefined;
}

export default function FillMemoryDetailModal({
  handleClose,
  isOpen,
  selectedMemoryId,
  selectedMapType,
  handleUpdate,
  setSelectedMemoryId,
}: IFillMemoryDetailModal) {
  const [selectedDay, setSelectedDay] = useState(1);

  const { openDialog } = useDialogStore();
  const { data: memoryDetail } = useGetMemoryDetail(selectedMemoryId ?? '');
  const { mutateAsync: deleteMemory, isPending: isDeletePending } =
    useDeleteMemory(selectedMapType ?? '');

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    setSelectedMemoryId(0);
  };

  /** 여행 삭제 */
  const handelDeleteMemory = () => {
    if (!memoryDetail) return;

    openDialog({
      type: 'confirm',
      message: '추억을 삭제할까요?',
      okLabel: '삭제',
      onOk: async () => {
        await deleteMemory({ memoryId: memoryDetail?.id });
        onClickCloseBtn();
      },
    });
  };

  const filteredSchedule = memoryDetail?.schedules?.filter(
    (schedule) => schedule.day === selectedDay,
  );

  const getPlace = useMemo(() => {
    const targetDay = memoryDetail?.schedules?.find(
      (s) => s.day === selectedDay,
    );

    if (!targetDay) return [];

    const places = targetDay.scheduleList
      .filter((item) => item.type === SCHEDULE_TYPE.PLACE && !!item.place)
      .map((item) => item.place as IPlaceList);

    return places.length > 0 ? places : [];
  }, [memoryDetail?.schedules, selectedDay]);

  return (
    <SideModal
      isOpen={isOpen}
      title={memoryDetail?.title}
      handleClose={onClickCloseBtn}
      footer={
        <div className={cn('flex w-full justify-between gap-1')}>
          <Button
            variant="redOutline"
            onClick={handelDeleteMemory}
            disabled={isDeletePending}
            isLoading={isDeletePending}
          >
            삭제
          </Button>
          <div className="flex gap-1">
            <Button variant="gray" onClick={onClickCloseBtn}>
              닫기
            </Button>
            <Button onClick={handleUpdate}>수정</Button>
          </div>
        </div>
      }
    >
      <div className="scrollbar-hide flex h-full flex-col gap-5 overflow-auto">
        {memoryDetail?.imageUrl.length ? (
          <EmblaCarousel imageUrls={memoryDetail.imageUrl} />
        ) : null}

        <div className="flex flex-col gap-2">
          {memoryDetail?.scheduleTitle && (
            <h5 className="font-bold">{memoryDetail?.scheduleTitle}</h5>
          )}
          <span>
            {convertTravelDateRange(memoryDetail?.from, memoryDetail?.to)}
          </span>
          {memoryDetail?.memo && (
            <Card className="whitespace-pre-wrap">{memoryDetail.memo}</Card>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {memoryDetail && (
            <div className="scrollbar-hide flex shrink-0 gap-1 overflow-x-auto">
              {memoryDetail.schedules.map((_day, index) => (
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
          <div
            className={cn(
              'h-50 overflow-hidden rounded-lg',
              getPlace.length ? 'block' : 'hidden',
            )}
          >
            <GoogleMap
              places={getPlace}
              id="memoryMap"
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string}
            />
          </div>
          <div className="flex flex-col gap-3">
            {filteredSchedule?.map((schedule, index) => (
              <MemoryScheduleDay
                key={`${schedule.day}-${index}`}
                schedule={schedule}
                readonly
              />
            ))}
          </div>
          {!memoryDetail?.schedules.length && (
            <span className="text-text-secondary">
              추억과 함께한 일정이 없어요
            </span>
          )}
        </div>
      </div>
    </SideModal>
  );
}
