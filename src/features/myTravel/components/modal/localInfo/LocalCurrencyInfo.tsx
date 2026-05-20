/**
 * @file: LocalCurrencyInfo.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: LocalCurrencyInfo 컴포넌트, 환율 정보
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { useFetchCurrency } from '@/shared/hooks/rquery/useFetchCurrency';
import { useGetCurrencyByCountry } from '@/shared/hooks/useGetCurrencyByCountry';
import { CURRENCY_STANDARD_AMOUNT } from '@/features/myTravel/constants';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { convertFormattedDate, convertComma } from '@/shared/lib/utils';

interface ILocalCurrencyInfo {
  selectedCity: IPlaceList | undefined;
}

export default function LocalCurrencyInfo({
  selectedCity,
}: ILocalCurrencyInfo) {
  const { lastUpdate } = useFetchCurrency();
  const getCurrency = useGetCurrencyByCountry(
    selectedCity?.countryCode,
    CURRENCY_STANDARD_AMOUNT,
  );

  return (
    <>
      {getCurrency ? (
        <div className="break-keep">
          <span className="text-primary text-lg font-bold">
            {selectedCity?.countryName}
          </span>
          ({selectedCity?.name})의 환율은<br />
          <span className="text-text-secondary">
            {convertFormattedDate(lastUpdate)}
          </span>
          &nbsp;기준,
          <br /> {`${convertComma(CURRENCY_STANDARD_AMOUNT)}원`}에&nbsp;
          <span className="text-primary font-bold">
            {getCurrency.currencyCode} {getCurrency.symbol}
            {getCurrency.convertedStandard}
          </span>
          &nbsp;
          <span className="text-text-secondary text-sm">
            ({getCurrency.symbol}1 = {getCurrency.convertedWon}원)
          </span>
          &nbsp;이에요
        </div>
      ) : (
        <span className="text-state-error">환율 정보를 가져오지 못했어요</span>
      )}
    </>
  );
}
