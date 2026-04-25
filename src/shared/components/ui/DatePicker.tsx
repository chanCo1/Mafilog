/**
 * @file: DatePicker.tsx
 * @author: chad
 * @since: 2026.04.25 ~
 * @description: DatePicker 컴포넌트, 달력 컴포넌트
 */

import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import '@/shared/styles/datePicker.css';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { CircleX } from 'lucide-react';

interface IDatePicker {
  selected: DateRange | undefined;
  onSelected: (value: DateRange | undefined) => void;
}

export default function DatePicker({ selected, onSelected }: IDatePicker) {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    selected,
  );

  /** 날짜 선택 */
  const onSelectedDate = (value: DateRange | undefined) => {
    setSelectedDate(value);
    onSelected(value);
  };

  /** 선택된 값 초기화 */
  const dataReset = () => {
    setSelectedDate(undefined);
    onSelected(undefined);
  };

  return (
    <div className="">
      <div
        className="text-text-primary flex cursor-pointer items-center justify-end gap-1"
        onClick={dataReset}
      >
        <CircleX className="h-5 w-5" />
        다시 선택
      </div>
      <DayPicker
        showOutsideDays
        animate
        mode="range"
        selected={selectedDate}
        onSelect={onSelectedDate}
        locale={ko}
      />
    </div>
  );
}
