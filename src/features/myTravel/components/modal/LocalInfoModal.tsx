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
import { IPlaceList } from '@/features/myTravel/interfaces';
import LocalCurrencyInfo from '@/features/myTravel/components/modal/localInfo/LocalCurrencyInfo';
import LocalTimeInfo from '@/features/myTravel/components/modal/localInfo/LocalTimeInfo';
import Separator from '@/shared/components/ui/Separator';
import LocalWeatherInfo from '@/features/myTravel/components/modal/localInfo/LocalWeatherInfo';

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
        <div className="flex items-center gap-1 overflow-auto scrollbar-hide">
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
        <div className="flex flex-col gap-10">
          <LocalCurrencyInfo selectedCity={selectedCity} />
          <Separator position='horizontal' />
          <LocalTimeInfo selectedCity={selectedCity} />
          <Separator position='horizontal' />
          <LocalWeatherInfo selectedCity={selectedCity} />
        </div>
      </div>
    </SideModal>
  );
}
