import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { formatDate, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  TRAVEL_PARTNER,
  TRAVEL_STYLE,
  PLACE_CATEGORY_TYPE,
} from '@/shared/types/Enum';
import { EXPENSES_CATEGORY_TYPE } from '@/shared/types/expenseEnum';
import {
  TRAVEL_PARTNER_LIST,
  TRAVEL_STYLE_LIST,
} from '@/features/myTravel/constants';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { EXPENSES_PAYMENT_TYPE } from '@/shared/types/expenseEnum';

/** 조건부로 클래스 사용(clsx) + props로 받은 스타일이 기본 스타일을 덮어쓰기(twMerge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 날짜 포멧 변경 */
export const convertFormattedDate = (date: Date, format = 'yyyy-MM-dd') => {
  if (!date) return '';
  return formatDate(date, format, { locale: ko });
};

/** 무슨 요일인지 구하기 */
export const getDay = (date: Date) => {
  return formatDate(date, 'E', { locale: ko });
};

/** 시간을 0시 0분 0초로 초기화 */
const setResetHour = (date: Date): Date => {
  const _date = new Date(date);
  _date.setHours(0, 0, 0, 0);

  return _date;
};

/** 여행 기간 구하기 */
export const getTravelDay = (from: Date, to: Date) => {
  if (!from || !to) return 0;

  const startDate = setResetHour(from);
  const endDate = setResetHour(to);

  return differenceInDays(endDate, startDate) + 1;
};

/** 여행 디데이 계산 */
export const calcDDay = (from: Date) => {
  if (!from) return 0;

  const today = setResetHour(new Date());
  const startDate = setResetHour(from);

  const diffTime = startDate.getTime() - today.getTime();
  // 일수로 변환
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/** 여행 일차 계산 */
export const getTravelCurrentDay = (from: Date, to: Date) => {
  if (!from || !to) return 0;

  const today = setResetHour(new Date());
  const startDate = setResetHour(from);
  // const endDate = setResetHour(to);

  const diffTime = today.getTime() - startDate.getTime();
  // 일수로 변환
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // if (today.getTime() === endDate.getTime()) {
  //   return 'end';
  // }

  return diffDays;
};

/** 여행 기간에 따른 일차 & 날짜 구하기 */
export const getTravelDayOfWeek = (from: Date, to: Date) => {
  const travelDays = Array.from({ length: getTravelDay(from, to) }).map(
    (_, index) => {
      const _day = index + 1;
      const dupDate = new Date(from);
      dupDate.setDate(from.getDate() + index);

      return { day: _day, date: dupDate };
    },
  );

  return travelDays;
};

/** 여행 동반자 변환 */
export const convertTravelPartner = (partner: TRAVEL_PARTNER) => {
  return TRAVEL_PARTNER_LIST.find((list) => list.value === partner)?.label;
};

/** 여행 스타일 */
export const convertTravelStyle = (style: TRAVEL_STYLE) => {
  return TRAVEL_STYLE_LIST.find((list) => list.value === style)?.label;
};

/** 장소 카테고리 가져오기 */
export const getPlaceCategory = (types: IPlaceList['types']) => {
  if (!types) return '';

  const findCategory = Object.entries(PLACE_CATEGORY_TYPE).find(
    ([key, value]) => {
      if (key === 'ETC') return false;
      return value.some((category) => types.includes(category));
    },
  );

  const resultCategory = findCategory ? findCategory[0] : 'ETC';

  return convertCategory(resultCategory as EXPENSES_CATEGORY_TYPE);
};

/** 장소/지출 카테고리 한글로 변환 */
export const convertCategory = (category: EXPENSES_CATEGORY_TYPE) => {
  switch (category.toLocaleLowerCase()) {
    case EXPENSES_CATEGORY_TYPE.BUS:
      return '교통';
    case EXPENSES_CATEGORY_TYPE.TOUR:
      return '관광';
    case EXPENSES_CATEGORY_TYPE.SHOPPING:
      return '쇼핑';
    case EXPENSES_CATEGORY_TYPE.HOUSE:
      return '숙박';
    case EXPENSES_CATEGORY_TYPE.FOOD:
      return '음식';
    case EXPENSES_CATEGORY_TYPE.ETC:
      return '기타';
    default:
      return '기타';
  }
};

/** 결제 타입 한글로 변환 */
export const convertPaymentType = (paymentType: EXPENSES_PAYMENT_TYPE) => {
  switch (paymentType) {
    case EXPENSES_PAYMENT_TYPE.CARD:
      return '카드';
    case EXPENSES_PAYMENT_TYPE.CASH:
      return '현금';
    default:
      return '알 수 없음';
  }
};

// = = = = = = = = = = = = = = = = 금액 관련
/** 숫자에 1,000 단위 콤마를 추가하는 함수 */
export const convertComma = (value: number | string): string => {
  if (!value && value !== 0) return '0';

  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) return '';

  return new Intl.NumberFormat('ko-KR').format(num);
};

/** 소수점 2자리에서 반올림 처리 */
export const roundDecimal = (number: number | string, decimal = 10): number => {
  if (!number && number !== 0) return 0;

  const num = typeof number === 'string' ? Number(number) : number;
  if (isNaN(num)) return 0;

  return Math.round(num * decimal) / decimal;
};

/** 퍼센트 구하기 */
export const getPercent = ({
  deno,
  numer,
  round = 10,
}: {
  numer: number;
  deno: number;
  round?: number;
}) => {
  if (!numer || !deno) return 0;

  return Math.round((numer / deno) * 100 * round) / round;
};

/** 
 * 토큰 만료일 구하기
 * @param {number} day 일수 (1일 = 1, 30일 = 30), 기본 1
 */
export const getTokenExpire = (day: number = 1) => {
  return Math.floor(Date.now() / 1000) + day * 24 * 60 * 60;
};
