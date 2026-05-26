import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';

export interface IHandleUpdateSchedule {
  day: number;
  listId: number;
  key: 'rating' | 'memo';
  value: string | number;
}

/** 추억 리스트 조회 */
export interface IMemoryListResponse {
  id: number;
  day: number;
  date: string;
  travelId: number;
  scheduleList: IMemoryScheduleList[];
  updatedAt: string;
  createdAt: string;
}

export interface IMemoryScheduleList {
  createdAt: string;
  day: number;
  id: number;
  memo: string;
  order: number;
  scheduleId: number;
  time: string;
  type: string;
  place: IPlaceList[];
  updatedAt: string;
}
