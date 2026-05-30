/**
 * @file: FillMemoryStep2.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 추억채우기 날짜 선택 모달
 */

import { Dispatch, SetStateAction } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { Calendar } from 'lucide-react';
import DatePicker from '@/shared/components/ui/DatePicker';
import { DateRange } from 'react-day-picker';
import { convertTravelDateRange } from '@/shared/lib/utils';

interface IFillMemoryStep2 {
  selectedDate: DateRange | undefined;
  setSeletedDate: Dispatch<SetStateAction<DateRange | undefined>>;
  disabled: boolean;
}

export default function FillMemoryStep2({
  selectedDate,
  setSeletedDate,
  disabled,
}: IFillMemoryStep2) {
  return (
    <div className="flex h-full flex-col gap-2">
      <Input
        label="여행기간"
        placeholder="ex) 2026-01-01 ~ 2026-01-02"
        description={disabled ? '여행 일정 기간이 자동으로 선택되었어요' : "아래 달력에서 여행기간을 선택해주세요"}
        isRequired
        readOnly
        value={convertTravelDateRange(selectedDate?.from, selectedDate?.to)}
        prefix={<Calendar className="h-4 w-4" />}
      />
      <div className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-auto">
        <DatePicker
          selected={selectedDate}
          onSelected={setSeletedDate}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
