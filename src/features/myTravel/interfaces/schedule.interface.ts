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
