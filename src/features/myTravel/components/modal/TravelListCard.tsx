/**
 * @file: TravelListCard.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: TravelListCard 컴포넌트, 여행 리스트 카드
 */

import { cn } from '@/shared/lib/utils';
import { ICityList } from '@/features/myTravel/interfaces';
import { convertFormattedDate, getTravelDay } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/Badge';
import { calcDDay } from '@/shared/lib/utils';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';

interface ITravelListCard {
  className?: string;
  name: string;
  from: Date;
  to: Date;
  cities: ICityList[];
}

export default function TravelListCard({
  className,
  cities,
  from,
  to,
  name,
}: ITravelListCard) {
  const { countryData } = useCountriesDataStore();

  /** 여행 기간 포멧 */
  const getFormattedDay = () => {
    if (!from || !to) return '';

    if (from === to) {
      return `${convertFormattedDate(from)} (${getTravelDay(from, to)}일)`;
    }

    return `${convertFormattedDate(from)} ~ ${convertFormattedDate(to)} (${getTravelDay(from, to)}일)`;
  };

  return (
    <div
      className={cn(
        'bg-gray-1 relative flex h-45 cursor-pointer flex-col items-center justify-center rounded-lg p-2.5',
        className,
      )}
    >
      {calcDDay(from) > 0 ? (
        <div className="absolute top-0 right-0 p-2">
          <Badge>D-{calcDDay(from)}</Badge>
        </div>
      ) : null}
      <p className="text-lg font-bold text-black">{name}</p>
      <p className="text-text-primary">{getFormattedDay()}</p>
    </div>
  );
}
