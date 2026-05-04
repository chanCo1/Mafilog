/**
 * @file: useFetchCurrency.ts
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: 환율 정보 호출 react query
 */

import { useQuery } from '@tanstack/react-query';
import { getExchangeRate } from '@/features/myTravel/services/currencyService';
import { convertFormattedDate } from '@/shared/lib/utils';

export const useFetchCurrency = (targetCurrencyCode: string = 'KRW') => {
  const query = useQuery({
    queryKey: ['exchangeRate'],
    queryFn: async () => {
      const today = convertFormattedDate(new Date());
      /** 로컬스토리지에서 데이터 가져옴 */
      const cached = localStorage.getItem('exchange_data');
      const cachedDate = localStorage.getItem('exchange_date');

      /**
       * 저장된 데이터가 있고, 오늘 날짜와 같으면 로컬스토리지에 있는 데이터를 전달
       * api 호출 비용 절감을 위해 하루에 한번 api 호출
       */
      if (cached && cachedDate === today) {
        return JSON.parse(cached);
      }

      /** 데이터가 없거나 날짜가 지났으면 새로 호출 */
      const data = await getExchangeRate({ baseCurrency: targetCurrencyCode });

      /** 로컬스토리지에 저장 */
      localStorage.setItem('exchange_data', JSON.stringify(data));
      localStorage.setItem('exchange_date', today!);

      return data;
    },
    staleTime: Infinity,
  });

  return {
    ...query,
    currencyData: query.data?.conversion_rates,
    baseCode: query.data?.base_code,
    lastUpdate: query.data?.time_last_update_utc,
  };
};
