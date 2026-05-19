/** 장소 정보 */
export interface IPlaceList {
  id: string;
  name: string;
  address: string;
  countryName: string;
  countryCode: string;
  lat: number;
  lng: number;
  types: string[];
  timezone?: string;
}

/** 일정 리스트 조회 */
export interface IScheduleListResponse {
  id: number;
  day: number;
  date: string;
  travelId: number;
  createAt: string;
  scheduleList: [];
}
