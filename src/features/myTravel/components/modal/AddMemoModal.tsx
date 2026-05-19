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
import { IScheduleResponse } from '@/features/myTravel/interfaces/schedule.interface';
import { getTravelDayList } from '@/shared/lib/utils';
import { useParams } from 'next/navigation';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { useMutateSchedulePlace } from '@/features/myTravel/hooks/rquery/useMutateSchedulePlace';

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
  const params = useParams();

  /** 일정 선택 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>();
  /** 메모 입력 */
  const [inputMemo, setInputMemo] = useState('');

  const travelDayList = getTravelDayList(scheduleList);

  const { mutateAsync: createSechdulePlace, isPending } =
    useMutateSchedulePlace(SCHEDULE_TYPE.PLACE);

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
  const handelAddMemo = async () => {
    if (!selectedDay) return;

    const getScheduleId = scheduleList.find(
      (list) => list.day === selectedDay.value,
    )?.id;

    if (getScheduleId) {
      await createSechdulePlace({
        travelId: params.travelId as string,
        data: {
          type: SCHEDULE_TYPE.MEMO,
          memo: inputMemo,
          day: selectedDay.value as number,
          scheduleId: getScheduleId,
        },
      });
    }

    onClickCloseBtn();
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
          <Button
            disabled={isPending}
            isLoading={isPending}
            onClick={handelAddMemo}
          >
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
