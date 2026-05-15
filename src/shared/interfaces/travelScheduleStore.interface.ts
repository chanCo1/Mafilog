import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';
import { ILabelValue } from '@/shared/interfaces';

/** 일정 리스트 */
export interface ISchedule {
  day: number;
  date: Date;
  list: IScheduleList[];
}

export interface IScheduleList {
  id: string;
  type: SCHEDULE_TYPE;
  place?: IPlaceList | null;
  time?: string;
  memo?: string;
  day: ILabelValue;
}

export interface IDateFromTo {
  from: Date;
  to: Date;
}

/** 여행 상세 전역 인터페이스 (state) */
export interface ITravelScheduleState {
  schedules: ISchedule[];
}

/** 여행 스케줄 전역 인터페이스 (actions) */
export interface ITravelScheduleActions {
  setInitSchedules: (date: IDateFromTo) => void;
  setAddScheduleList: (data: {
    type: SCHEDULE_TYPE;
    day: ILabelValue;
    places?: IPlaceList[];
    memo?: string;
    time?: string;
  }) => void;
  setDeleteScheduleList: (data: { day: number; id: string | number }) => void;
  setUpdateSchedule: (data: {
    day: ILabelValue;
    time: string;
    memo: string;
  }) => void;
  reset: () => void;
}

/** 여행 스케줄 전역 인터페이스 (getters) */
export interface ITravelScheduleGetters {
  getTravelSchedules: () => ISchedule[];
}
