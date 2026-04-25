import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { formatDate, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

/** 조건부로 클래스 사용(clsx) + props로 받은 스타일이 기본 스타일을 덮어쓰기(twMerge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 날짜 포멧 변경 */
export const convertFormattedDate = (date: Date, format = 'yyyy.MM.dd') => {
  return formatDate(date, format, { locale: ko });
};

/** 무슨 요일인지 구하기 */
export const getDay = (date: Date) => {
  return formatDate(date, 'E', { locale: ko });
};

/** 여행 기간 구하기 */
export const getTravelDay = (from: Date, to: Date) => {
  return (differenceInDays(to, from) + 1);
};
