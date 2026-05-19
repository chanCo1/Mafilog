/**
 * @file: AddMemoModal.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: AddMemoModal 컴포넌트, 메모 추가 모달
 */

import { useEffect, useState } from 'react';
import { ILabelValue } from '@/shared/interfaces';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Textarea } from '@/shared/components/ui/Textarea';
import Selectbox from '@/shared/components/ui/Selectbox';
import { Button } from '@/shared/components/ui/Button';
import { toast } from 'sonner';
import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
import { IScheduleResponse } from '@/features/myTravel/interfaces/schedule.interface';
import { getTravelDayList } from '@/shared/lib/utils';

interface IAddMemoModal {
  isOpen: boolean;
  handleClose: () => void;
  scheduleList: IScheduleResponse[];
}

export default function AddMemoModal({
  isOpen,
  handleClose,
  scheduleList,
}: IAddMemoModal) {
  const setAddScheduleList = useTravelScheduleStore(
    (state) => state.setAddScheduleList,
  );

  /** 일정 선택 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>();
  /** 메모 입력 */
  const [inputMemo, setInputMemo] = useState('');

  const travelDayList = getTravelDayList(scheduleList);

  /** 일정 선택 초기값 */
  useEffect(() => {
    if (isOpen) {
      setSelectedDay(travelDayList[0]);
    }
  }, [isOpen]);

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    dataReset();
  };

  /** 데이터 초기화 */
  const dataReset = () => {
    setInputMemo('');
  };

  /** 메모 추가 핸들링 */
  const handelAddMemo = () => {
    if (!selectedDay) return;

    try {
      setAddScheduleList({
        type: 'memo',
        day: selectedDay,
        memo: inputMemo,
      });
    } catch (error) {
      console.log(error);
    }

    onClickCloseBtn();
    toast.success('메모를 추가했어요');
  };

  return (
    <SideModal
      isOpen={isOpen}
      title="메모 추가"
      handleClose={onClickCloseBtn}
      footer={
        <>
          <Button variant="gray" onClick={onClickCloseBtn}>
            취소
          </Button>
          <Button disabled={!inputMemo} onClick={handelAddMemo}>
            메모 추가
          </Button>
        </>
      }
    >
      <div className="flex h-full flex-col gap-2">
        <Selectbox
          label="여행 일정 선택"
          options={travelDayList}
          value={selectedDay}
          onChange={(value) => setSelectedDay(value)}
          placeholder="여행 일정을 선택해주세요"
          isRequired
        />
        <Textarea
          label="메모"
          isRequired
          onChange={(e) => setInputMemo(e.target.value)}
          value={inputMemo}
        />
      </div>
    </SideModal>
  );
}
