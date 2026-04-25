/**
 * @file: DatePicker.tsx
 * @author: chad
 * @since: 2026.04.25 ~
 * @description: DatePicker 컴포넌트, 달력 컴포넌트
 */

import { DayPicker, DateRange, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import '@/shared/styles/datePicker.css'
import { ko } from 'date-fns/locale';

interface IDatePicker {
  value: DateRange;
  onSelected: () => void;
}

export default function DatePicker({ onSelected, value }: IDatePicker) {
  console.log(getDefaultClassNames())

  return (
    <DayPicker
      showOutsideDays
      animate
      mode="range"
      selected={value}
      onSelect={onSelected}
      locale={ko}
    />
  );
}
