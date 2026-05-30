/**
 * @file: DatePicker.tsx
 * @author: chad
 * @since: 2026.04.25 ~
 * @description: DatePicker 컴포넌트, 달력 컴포넌트
 */

import { DayPicker, DateRange } from 'react-day-picker';
import { cn } from '@/shared/lib/utils';
import 'react-day-picker/style.css';
import '@/shared/styles/datePicker.css';
import { ko } from 'date-fns/locale';
import { CircleX } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IDatePicker {
  selected: DateRange | undefined;
  onSelected: (value: DateRange | undefined) => void;
  disabled?: boolean;
}

export default function DatePicker({
  selected,
  onSelected,
  disabled,
}: IDatePicker) {
  const [month, setMonth] = useState<Date | undefined>(
    selected?.from || new Date(),
  );

  const resetSelectedDate = () => {
    if (disabled) return;
    onSelected(undefined);
  };

  useEffect(() => {
    const fromDate = selected?.from;
    if (fromDate) {
      setMonth(fromDate);
    }
  }, [selected?.from]);

  return (
    <div className="">
      <div
        className={cn(
          'flex items-center justify-end gap-1',
          disabled ? 'text-text-secondary' : 'text-text-primary cursor-pointer',
        )}
        onClick={resetSelectedDate}
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
        disabled={disabled}
      />
    </div>
  );
}
