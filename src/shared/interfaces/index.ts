/** 기본 key: value */
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
