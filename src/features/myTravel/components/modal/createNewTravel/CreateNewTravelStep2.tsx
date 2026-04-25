/**
 * @file: CreateNewTravelStep2.tsx
 * @author: chad
 * @since: 2026.04.25 ~
 * @description: CreateNewTravelStep2 컴포넌트, 여행 기간 선택
 */

import { useMemo, Dispatch, SetStateAction } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { Calendar } from 'lucide-react';
import DatePicker from '@/shared/components/ui/DatePicker';
import { DateRange } from 'react-day-picker';
import { formatDate, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ICreateNewTravelStep2 {
  selectedDate: DateRange | undefined;
  setSeletedDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

export default function CreateNewTravelStep2({
  selectedDate,
  setSeletedDate,
}: ICreateNewTravelStep2) {

  /** 여행 기간 날짜 포멧 */
  const formattedValue = useMemo(() => {
    if (!selectedDate?.from || !selectedDate?.to) return '';

    const travelDay = differenceInDays(selectedDate.to, selectedDate.from) + 1;

    if (selectedDate.from === selectedDate.to) {
      return `${formatDate(selectedDate.from, 'yyyy.MM.dd', { locale: ko })} (${travelDay}일)`;
    }

    return `${formatDate(selectedDate.from, 'yyyy.MM.dd', { locale: ko })} ~ ${formatDate(selectedDate.to, 'yyyy.MM.dd', { locale: ko })} (${travelDay}일)`;
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        label="여행기간"
        placeholder="ex) 2026-01-01 ~ 2026-01-02"
        description="아래 달력에서 여행기간을 선택해주세요"
        isRequired
        readOnly
        value={formattedValue}
        prefix={<Calendar className="h-4 w-4" />}
      />
      <DatePicker selected={selectedDate} onSelected={setSeletedDate} />
    </div>
  );
}
