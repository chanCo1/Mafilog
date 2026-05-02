/**
 * @file: PlaceDeatilModal.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: PlaceDeatilModal 컴포넌트, 일정 상세 모달
 */

import { useState, useEffect } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Selectbox } from '@/shared/components/ui/Selectbox';
import { Button } from '@/shared/components/ui/Button';
import { useTravelStore } from '@/shared/stores/useTravelStore';
import { toast } from 'sonner';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { ILabelValue, IScheduleList } from '@/shared/interfaces';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

interface IPlaceDeatilModal {
  isOpen: boolean;
  handleClose: () => void;
  data: IScheduleList | undefined;
  day: number | undefined;
}

export default function PlaceDeatilModal({
  isOpen,
  handleClose,
  data,
  day,
}: IPlaceDeatilModal) {
  const isPlace = data?.type === SCHEDULE_TYPE.PLACE;

  const travelInfo = useTravelStore((state) => state.travelInfo);
  const setDeleteScheduleList = useTravelStore(
    (state) => state.setDeleteScheduleList,
  );
  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });

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
  };

  /** 초기값 대입 */
  useEffect(() => {
    if (day) {
      setSelectedDay(travelDaysList[day - 1]);
    }

    if (data?.time) {
      setSelectedTime(data?.time);
    }

    if (data?.memo) {
      setInputMemo(data?.memo);
    }
  }, [day, travelDaysList]);

  return (
    <SideModal
      isOpen={isOpen}
      title={isPlace ? `${data.place?.name}` : '메모 수정'}
      handleClose={onClickCloseBtn}
      footer={
        <div className="flex w-full justify-between">
          <Button variant="redOutline">삭제</Button>
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
            // TODO: 시간 선택 셀렉트 해야함
            <Selectbox
              label="방문 시간"
              options={[]}
              // value={''}
              // onChange={(value) => setSelectedDay(value)}
              placeholder="-- : --"
              className="w-2/5"
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
