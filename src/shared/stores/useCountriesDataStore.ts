/**
 * 매번 fetch해서 국가 정보를 가져오는 불필요 연산 방지
 * data[key] 형식으로 정보 가져오기
 */

import { create } from 'zustand';
import { ICountriesData } from '@/shared/interfaces';

interface ICountriesDataStore {
  countryData: {};
  fetchCountires: () => void;
}

export const useCountriesDataStore = create<ICountriesDataStore>((set) => ({
  countryData: {},
  fetchCountires: async () => {
    const res = await fetch('/data/countries_data.json');
    const data: ICountriesData[] = await res.json();

    const formatted = data.reduce<Record<string, ICountriesData>>(
      (acc, cur) => {
        acc[cur.code] = cur;
        return acc;
      },
      {},
    );

    set({ countryData: formatted });
  },
}));
