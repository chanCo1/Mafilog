import { ICheckList } from '@/features/myTravel/interfaces/schedule.interface';

/** 여행 체크리스트 전역 인터페이스 (state) */
export interface ITravelCheckListState {
  checkList: ICheckList[];
}

/** 여행 체크리스트 전역 인터페이스 (actions) */
export interface ITravelCheckListActions {
  setInitCheckList: (date: ICheckList[]) => void;
  reset: () => void;
}

/** 여행 체크리스트 전역 인터페이스 (getters) */
export interface ITravelCheckListGetters {}
