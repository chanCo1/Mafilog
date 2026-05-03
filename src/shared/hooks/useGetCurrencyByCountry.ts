/**
 * @file: useGetCurrencyByCountry.ts
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: 국가 코드별 환율 금액 가져오는 훅
 */

import { useMemo } from 'react';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import { useIsMounted } from '@/shared/hooks/useIsMounted';
import { useFetchCurrency } from '@/features/myTravel/hooks/useFetchCurrency';

export const useGetCurrencyByCountry = (
  countryCode: string | undefined, // 국가 코드
  standardAmount: number = 1000,
) => {
  const isMounted = useIsMounted();
  /** 전역에 저장되어 있는 나라 정보 가져오기 */
  const { countryData } = useCountriesDataStore();
  const { currencyData } = useFetchCurrency();

  const getCurrency = useMemo(() => {
    if (!isMounted || !countryCode || !countryData[countryCode]) return;

    /** 국가코드로 특정 나라 정보 추출 */
    const _contry = countryData[countryCode];

    /** 환율 정보에서 통화 값 가져와서 currencyData의 환율 금액 반환 */
    const currencyCode = Object.keys(_contry.currency)[0];

    /** 통화 표 */
    const symbol = _contry.currency[currencyCode].symbol;

    /** 1원당 환율 금액(라이브러리에서 주는 대로) */
    const currencyAmount = currencyData[currencyCode];

    /** 기준 원화당 통화 금액 */
    const convertedStandard = (standardAmount * currencyAmount).toFixed(2);

    /** 통화 금액 1원당 원화 금액 */
    const convertedWon = (1 / currencyAmount).toFixed(2);

    return {
      currencyAmount, // 1원당 환율 금액
      convertedStandard, // 기준 원화당 환율 금액
      convertedWon, // 1 환율 금액 당 원화
      currencyCode, // 해당 통화 코드
      symbol, // 통화표
    };
  }, [countryCode, isMounted]);

  return getCurrency;
};
