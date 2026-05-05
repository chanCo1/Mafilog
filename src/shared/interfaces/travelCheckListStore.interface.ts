type TCategoryStatusType = 'editCategory' | 'addList' | null;

/** 체크리스트 */
export interface ICheckList {
  id: string | number;
  label: string;
  status: TCategoryStatusType;
  list: IChecklistItem[];
}

/** 체크리스트 아이템 */
export interface IChecklistItem {
  id: string | number;
  label: string;
  isChecked: boolean;
}

/** 여행 체크리스트 전역 인터페이스 (state) */
export interface ITravelCheckListState {
  checkList: ICheckList[];
}

/** 여행 체크리스트 전역 인터페이스 (actions) */
export interface ITravelCheckListActions {
  setInitCheckList: (data: ICheckList[]) => void;
  reset: () => void;
}

/** 여행 체크리스트 전역 인터페이스 (getters) */
export interface ITravelCheckListGetters {
  getCheckList: () => ICheckList[];
}
