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

export interface IMemberList {
  id: string;
  name: string;
  expenseId?: number | null;
  expenseSpenderId?: number | null;
  travelId?: number;
  userId: string;
  createdAt?: string;
}
