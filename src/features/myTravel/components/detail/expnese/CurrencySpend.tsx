/**
 * @file: CurrencySpend.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 지출 하단에 통화별 금액 노출 컴포넌트
 */

import { convertComma } from '@/shared/lib/utils';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';

interface ICurrencySpend {
  currency: string;
  spend: number;
  calcExchangeRate?: number;
  currencyCountry?: string;
}

export default function CurrencySpend({
  currency,
  spend,
  calcExchangeRate,
  currencyCountry,
}: ICurrencySpend) {
  const { countryData } = useCountriesDataStore();

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1">
        {currencyCountry && (
          <p className="">{countryData[currencyCountry].flagEmoji}</p>
        )}
        <div>
          {currencyCountry ? (
            <span className="text-sm font-bold">
              {countryData[currencyCountry].currency[currency].symbol}
            </span>
          ) : null}
          <span className="font-bold">{convertComma(spend)}</span>
        </div>
      </div>
      {calcExchangeRate && currency !== 'KRW' && (
        <span className="text-text-secondary text-sm font-bold">
          {convertComma(calcExchangeRate)}원
        </span>
      )}
    </div>
  );
}
