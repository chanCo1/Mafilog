/** 기본 key: value */
import { IPlaceList } from '@/features/myTravel/interfaces';
import { SCHEDULE_TYPE, TRAVEL_STATUS, TRAVEL_PARTNER, TRAVEL_STYLE } from '@/shared/types/Enum';

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
    status: TRAVEL_STATUS,
    travelPeriod: number;
    travelStyles: TRAVEL_STYLE[];
    travelPartner: TRAVEL_PARTNER;
    cities: IPlaceList[];
  };
  schedules: ISchedule[];
  expenses: {
    day: number | string;
  }[];
}

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

/** 여행 상세 전역 인터페이스 (actions) */
export interface ITravelActions {
  setInitTravel: (data: ITravelState['travelInfo']) => void;
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
