interface ILocation {
  lat: number;
  lng: number;
}

/** 장소 정보 */
export interface IPlaceList {
  id: string;
  name: string;
  address: string;
  countryName: string | undefined;
  countryCode: string | undefined;
  lat: number;
  lng: number;
  types: string[];
  timezone?: string;
}
