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
import { CircleX } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IDatePicker {
  selected: DateRange | undefined;
  onSelected: (value: DateRange | undefined) => void;
}

export default function DatePicker({ selected, onSelected }: IDatePicker) {
  const [month, setMonth] = useState<Date | undefined>(
    selected?.from || new Date()
  );

  useEffect(() => {
    if (selected?.from) {
      setMonth(selected.from);
    }
  }, [selected]);

  return (
    <div className="">
      <div
        className="text-text-primary flex cursor-pointer items-center justify-end gap-1"
        onClick={() => onSelected(undefined)}
      >
        <CircleX className="h-5 w-5" />
        다시 선택
      </div>
      <DayPicker
        showOutsideDays
        animate
        mode="range"
        selected={selected}
        onSelect={(value: DateRange | undefined) => onSelected(value)}
        locale={ko}
        month={month}
        onMonthChange={setMonth}
      />
    </div>
  );
}
