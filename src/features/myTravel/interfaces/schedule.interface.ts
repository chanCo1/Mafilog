interface ILocation {
  lat: number;
  lng: number;
}

/** 장소 정보 */
export interface IPlaceList {
  id: string;
  name: string;
  location: ILocation;
  address: string;
  country: {
    code: string | undefined;
    name: string | undefined;
  };
  types: string[];
  timezone?: string;
}

/** 체크리스트 */
export interface ICheckList {
  id: string | number;
  label: string;
  list: IChecklistItem[];
}

/** 체크리스트 아이템 */
export interface IChecklistItem {
  id: string | number;
  label: string;
  isChecked: boolean;
}
