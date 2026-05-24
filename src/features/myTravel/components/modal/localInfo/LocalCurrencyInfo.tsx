/**
 * @file: LocalCurrencyInfo.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: LocalCurrencyInfo 컴포넌트, 환율 정보
 */

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
        <div className="flex flex-col gap-1">
          <div className='flex gap-1 items-center'>
            <span>{getCurrency.countryEmoji}</span>
            <span className="text-primary text-lg font-bold">
              {selectedCity?.countryName}
            </span>
            ({selectedCity?.name})의 환율은
          </div>
          <div>
            <span className="text-text-secondary font-bold">
              {convertFormattedDate(lastUpdate)}
            </span>{' '}
            기준,
          </div>
          <div className="flex">
            {`${convertComma(CURRENCY_STANDARD_AMOUNT)}원`}에&nbsp;
            <div className="text-primary flex gap-1 font-bold">
              <div className='flex gap-1'>
                {/* <span className="text-sm">{getCurrency.symbol}</span> */}
                <span>{convertComma(getCurrency.convertedStandard)}</span>
                <span className="text-text-primary">
                  {getCurrency.currencyName}
                </span>
              </div>
            </div>
            &nbsp;
            <span className="text-text-secondary text-sm font-bold">
              ({getCurrency.symbol}1 = {getCurrency.convertedWon}원)
            </span>
            &nbsp;이에요
          </div>
        </div>
      ) : (
        <span className="text-state-error">환율 정보를 가져오지 못했어요</span>
      )}
    </>
  );
}
