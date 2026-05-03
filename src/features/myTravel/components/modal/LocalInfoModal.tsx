/**
 * @file: LocalInfoModal.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: LocalInfoModal 컴포넌트, 현지 정보 모달
 */

import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Chip } from '@/shared/components/ui/Chip';
import { useTravelStore } from '@/shared/stores/useTravelStore';
import { Button } from '@/shared/components/ui/Button';
import { useFetchCurrency } from '@/features/myTravel/hooks/useFetchCurrency';
import { IPlaceList } from '@/features/myTravel/interfaces';
import { convertFormattedDate, convertComma } from '@/shared/lib/utils';
import { useGetCurrencyByCountry } from '@/shared/hooks/useGetCurrencyByCountry';
import { CURRENCY_STANDARD_AMOUNT } from '@/features/myTravel/constants';

interface ILocalInfoModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function LocalInfoModal({
  handleClose,
  isOpen,
}: ILocalInfoModal) {
  const travelInfo = useTravelStore((state) => state.travelInfo);
  const [selectedCity, setSelectedCity] = useState<IPlaceList>();

  const { lastUpdate } = useFetchCurrency();
  const getCurrency = useGetCurrencyByCountry(
    selectedCity?.country.code,
    CURRENCY_STANDARD_AMOUNT,
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedCity(travelInfo.cities[0]);
    }
  }, [isOpen]);

  return (
    <SideModal
      isOpen={isOpen}
      title="현지 정보"
      handleClose={handleClose}
      footer={
        <Button variant="gray" onClick={handleClose}>
          닫기
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          {travelInfo.cities.map((city) => (
            <Chip
              key={city.id}
              variant={
                selectedCity?.name === city.name ? 'primary' : 'primaryOutline'
              }
              onClick={() => setSelectedCity(city)}
            >
              {city.name}
            </Chip>
          ))}
        </div>
        <div>
          <div className="break-keep">
            <span className="text-primary text-lg font-bold">
              {selectedCity?.country.name}
            </span>
            ({selectedCity?.name})의 환율은&nbsp;
            <span className="text-text-secondary">
              {convertFormattedDate(lastUpdate)}
            </span>
            &nbsp;기준,
            <br /> {`${convertComma(CURRENCY_STANDARD_AMOUNT)}원`}에&nbsp;
            <span className="text-primary font-bold">
              {getCurrency?.currencyCode}({getCurrency?.symbol})&nbsp;
              {getCurrency?.convertedStandard}
            </span>
            &nbsp;
            <span className="text-text-secondary text-sm">
              ({getCurrency?.symbol}1 = {getCurrency?.convertedWon}원)
            </span>
            &nbsp;이에요.
          </div>
        </div>
      </div>
    </SideModal>
  );
}
