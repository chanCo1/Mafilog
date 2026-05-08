/**
 * @file: PlaceDeatilModal.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: PlaceDeatilModal 컴포넌트, 일정 상세 모달
 */

import { useState, useEffect } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Textarea } from '@/shared/components/ui/Textarea';
import Selectbox from '@/shared/components/ui/Selectbox';
import { Button } from '@/shared/components/ui/Button';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import { toast } from 'sonner';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { ILabelValue } from '@/shared/interfaces';
import { IScheduleList } from '@/shared/interfaces/travelScheduleStore.interface';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
import { getPlaceCategory } from '@/shared/lib/utils';
import TimePicker from '@/shared/components/ui/TimePicker';

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

  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const setDeleteScheduleList = useTravelScheduleStore(
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
    resetData();
  };

  const resetData = () => {
    if (day) {
      setSelectedDay(travelDaysList[day - 1]);
    }

    setSelectedTime(data?.time ?? '');
    setInputMemo(data?.memo ?? '');
  };

  /** 초기값 대입 */
  useEffect(() => {
    resetData();
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
        {data?.place && (
          <div className="mb-4 flex flex-col gap-1">
            <p>{data.place.address}</p>
            <div className="text-text-secondary flex gap-1">
              <span>
                {data.place.country.name}
              </span>
              <span className='text-gray-2'> | </span>
              <span>{getPlaceCategory(data.place.types)}</span>
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
