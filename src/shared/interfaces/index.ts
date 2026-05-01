import { IPlaceList, IExpensesList } from '@/features/myTravel/interfaces';
import {
  SCHEDULE_TYPE,
  TRAVEL_STATUS,
  TRAVEL_PARTNER,
  TRAVEL_STYLE,
  EXPENSES_CATEGORY_TYPE,
} from '@/shared/types/Enum';

/** 기본 key: value */
export interface ILabelValue<T = string | number> {
  label: string;
  value: T;
}

/** 국가 정보 */
export interface ICountriesData {
  code: string;
  korName: string;
  engName: string;
  flagEmoji: string;
  latlng: number[];
  region: string;
  currency: ICountryCurrency;
}

export interface ICountryCurrency {
  [code: string]: {
    name: string;
    symbol: string;
  };
}

/** 여행 상세 전역 인터페이스 (state) */
export interface ITravelState {
  travelInfo: {
    id: number;
    title: string;
    from: Date;
    to: Date;
    status: TRAVEL_STATUS;
    travelPeriod: number;
    travelStyles: TRAVEL_STYLE[];
    travelPartner: TRAVEL_PARTNER;
    cities: IPlaceList[];
  };
  schedules: ISchedule[];
  expenses: IExpenses[];
}

/** 일정 리스트 */
export interface ISchedule {
  day: number;
  date: Date;
  list: {
    type: SCHEDULE_TYPE;
    place?: IPlaceList;
    time?: string;
    memo?: string;
  }[];
}

/** 가계부 리스트 */
export interface IExpenses {
  day: number;
  date: Date;
  list: {
    type: EXPENSES_CATEGORY_TYPE; // 지출 타입;
    expenses: IExpensesList;
    time?: string;
    memo?: string;
  }[];
  dailyExpenses: number; // 일일 총 지출;
}

export interface IDateFromTo {
  from: Date;
  to: Date;
}

/** 여행 상세 전역 인터페이스 (actions) */
export interface ITravelActions {
  setInitTravel: (data: ITravelState['travelInfo']) => void;
  setInitSchedules: (date: IDateFromTo) => void;
  setInitExpeneses: (date: IDateFromTo) => void;
  setAddScheduleList: (data: ISchedule) => void;
  setDeleteScheduleList: (id: string | number) => void;
  reset: () => void;
}

/** 여행 상세 전역 인터페이스 (getters) */
export interface ITravelGetters {
  getTravelInfo: () => ITravelState['travelInfo'];
  getTravelSchedules: () => ISchedule[];
  getTravelExpenses: () => any[];
}
