import {
  IPlaceList,
  ICheckList,
} from '@/features/myTravel/interfaces/schedule.interface';
import { IExpensesList } from '@/features/myTravel/interfaces/expense.interface';
import {
  SCHEDULE_TYPE,
  TRAVEL_STATUS,
  TRAVEL_PARTNER,
  TRAVEL_STYLE,
  EXPENSES_CATEGORY_TYPE,
} from '@/shared/types/Enum';
import { ILabelValue } from '@/shared/interfaces';

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
  checkList: ICheckList[];
}

/** 일정 리스트 */
export interface ISchedule {
  day: number;
  date: Date;
  list: IScheduleList[];
}

export interface IScheduleList {
  id: string;
  type: SCHEDULE_TYPE;
  place?: IPlaceList;
  time?: string;
  memo?: string;
}

/** 가계부 리스트 */
export interface IExpenses {
  day: number;
  date: Date;
  list: {
    id: string;
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
  setInitCheckList: (date: ICheckList[]) => void;
  setAddScheduleList: (data: {
    type: SCHEDULE_TYPE;
    day: ILabelValue;
    places?: IPlaceList[];
    memo?: string;
    time?: string;
  }) => void;
  setDeleteScheduleList: (data: { day: number; index: number }) => void;
  reset: () => void;
}

/** 여행 상세 전역 인터페이스 (getters) */
export interface ITravelGetters {
  getTravelInfo: () => ITravelState['travelInfo'];
  getTravelSchedules: () => ISchedule[];
  getTravelExpenses: () => any[];
}
