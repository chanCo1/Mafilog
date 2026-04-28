import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { formatDate, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TRAVEL_PARTNER, TRAVEL_STYLE } from '@/shared/types/Enum';
import { TRAVEL_PARTNER_LIST, TRAVEL_STYLE_LIST } from '@/features/myTravel/constants';

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
  return differenceInDays(to, from) + 1;
};

/** 여행 디데이 계산 */
export const calcDDay = (from: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(from);
  startDate.setHours(0, 0, 0, 0);

  const diffTime = startDate.getTime() - today.getTime();
  // 일수로 변환
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/** 여행 일차 계산 */
export const getTravelCurrentDay = (from: Date, to: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(from);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(to);
  endDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - startDate.getTime();
  // 일수로 변환
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (today.getTime() === endDate.getTime()) {
    return '마지막 날';
  }

  return `${diffDays}일차`;
};

/** 여행 동반자 변환 */
export const convertTravelPartner = (partner: TRAVEL_PARTNER) => {
  return TRAVEL_PARTNER_LIST.find((list) => list.value === partner)?.label;
};

/** 여행 스타일 */
export const convertTravelStyle = (style: TRAVEL_STYLE) => {
  return TRAVEL_STYLE_LIST.find((list) => list.value === style)?.label;
}