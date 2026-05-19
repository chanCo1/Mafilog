/**
 * @file: PlaceDeatilModal.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: PlaceDeatilModal 컴포넌트, 일정 상세 모달
 */

import { useState, useEffect, useCallback } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Textarea } from '@/shared/components/ui/Textarea';
import Selectbox from '@/shared/components/ui/Selectbox';
import { Button } from '@/shared/components/ui/Button';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import { toast } from 'sonner';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { ILabelValue } from '@/shared/interfaces';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
import { getPlaceCategory } from '@/shared/lib/utils';
import TimePicker from '@/shared/components/ui/TimePicker';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { ISecheduleListResponse } from '@/features/myTravel/interfaces/schedule.interface';

interface IPlaceDeatilModal {
  isOpen: boolean;
  handleClose: () => void;
  timeLineData: ISecheduleListResponse | undefined;
}

export default function PlaceDeatilModal({
  isOpen,
  handleClose,
  timeLineData,
}: IPlaceDeatilModal) {
  const isPlace = timeLineData?.type === SCHEDULE_TYPE.PLACE;

  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const setDeleteScheduleList = useTravelScheduleStore(
    (state) => state.setDeleteScheduleList,
  );
  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });
  const { openDialog } = useDialogStore();

  /** 일정 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>(
    travelDaysList?.[0],
  );
  /** 시간 */
  const [selectedTime, setSelectedTime] = useState('');
  /** 메모 */
  const [inputMemo, setInputMemo] = useState('');

  const onClickCloseBtn = () => {
    handleClose();
    resetData();
  };

  /** 일정 삭제 핸들러 */
  const handleDeleteSchedule = () => {
    if (timeLineData?.day === undefined) return;

    openDialog({
      message: `${isPlace ? '장소' : '메모'}를 삭제할까요?`,
      type: 'confirm',
      okLabel: '삭제',
      onOk: () => {
        setDeleteScheduleList({
          day: timeLineData.day as number,
          id: timeLineData?.id,
        });
        toast.success(`${isPlace ? '장소' : '메모'}를 삭제했어요`);
      },
    });
  };

  const resetData = useCallback(() => {
    if (timeLineData?.day) {
      setSelectedDay(travelDaysList[(timeLineData.day as number) - 1]);
    }

    setSelectedTime(timeLineData?.time ?? '');
    setInputMemo(timeLineData?.memo ?? '');
  }, []);

  /** 초기값 대입 */
  useEffect(() => {
    resetData();
  }, [timeLineData?.day, travelDaysList, resetData]);

  return (
    <SideModal
      isOpen={isOpen}
      title={isPlace ? `${timeLineData.place?.name}` : '메모 수정'}
      handleClose={onClickCloseBtn}
      footer={
        <div className="flex w-full justify-between">
          <Button variant="redOutline" onClick={handleDeleteSchedule}>삭제</Button>
          <div className="flex gap-1">
            <Button variant="gray" onClick={onClickCloseBtn}>
              취소
            </Button>
            <Button disabled={!inputMemo}>수정</Button>
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-2">
        {timeLineData?.place && (
          <div className="mb-4 flex flex-col gap-1">
            <p>{timeLineData.place.address}</p>
            <div className="text-text-secondary flex gap-1">
              <span>{timeLineData.place.countryName}</span>
              <span className="text-gray-2"> | </span>
              <span>{getPlaceCategory(timeLineData.place.types)}</span>
            </div>
          </div>
        )}
        <div className="flex gap-1">
          <Selectbox
            label="여행 일정"
            options={travelDaysList}
            value={selectedDay}
            onChange={(value) => setSelectedDay(value)}
            placeholder="여행 일정을 선택해주세요"
            isRequired
            className={isPlace ? 'w-3/5' : 'w-full'}
          />
          {isPlace ? (
            <TimePicker
              label="방문 시간"
              placeholder="-- : --"
              className="w-2/5"
              value={selectedTime}
              onChange={(value) => setSelectedTime(value)}
            />
          ) : null}
        </div>
        <Textarea
          label="메모"
          onChange={(e) => setInputMemo(e.target.value)}
          value={inputMemo}
        />
      </div>
    </SideModal>
  );
}
