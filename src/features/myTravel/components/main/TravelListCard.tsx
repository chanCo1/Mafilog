/**
 * @file: TravelListCard.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: TravelListCard 컴포넌트, 여행 리스트 카드
 */

import { cn } from '@/shared/lib/utils';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { convertFormattedDate, getTravelDay } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/Badge';
import { calcDDay } from '@/shared/lib/utils';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';
import { Card } from '@/shared/components/ui/Card';
import Image from 'next/image';
import { truncateText } from '@/shared/lib/utils';

interface ITravelListCard {
  className?: string;
  travel: IMyTravelListResponse;
  onClick?: () => void;
}

export default function TravelListCard({
  className,
  travel,
  onClick,
}: ITravelListCard) {
  const { countryData } = useCountriesDataStore();

  /** 여행 기간 포멧 */
  const getFormattedDay = () => {
    if (!travel.from || !travel.to) return '';

    // 시작,끝이 같을 경우 당일로 간주
    if (travel.from === travel.to) {
      return `${convertFormattedDate(travel.from)} (${getTravelDay(travel.from, travel.to)}일)`;
    }

    return `${convertFormattedDate(travel.from)} ~ ${convertFormattedDate(travel.to)} (${getTravelDay(travel.from, travel.to)}일)`;
  };

  /** 여행 도시 그룹화 [key]: value */
  const groupedTravelCity = travel.cities.reduce(
    (acc, cur) => {
      const _countryCode = cur.countryCode;

      if (!acc[_countryCode]) {
        acc[_countryCode] = [];
      }

      acc[_countryCode].push(cur);

      return acc;
    },
    {} as Record<string, IPlaceList[]>,
  );

  return (
    <Card
      className={cn(
        'relative flex h-45 cursor-pointer flex-col items-center justify-center text-white bg-gray-5',
        className,
      )}
      onClick={onClick}
    >
      {travel.imageUrl && (
        <Image
          src={travel.imageUrl}
          alt="배경 이미지"
          fill
          priority
          className="z-0 object-fill rounded-lg"
        />
      )}
      {calcDDay(travel.from) > 0 ? (
        <div className="absolute top-2 right-2">
          <Badge>D-{calcDDay(travel.from)}</Badge>
        </div>
      ) : null}
      <p className="z-1 text-center text-lg font-bold text-outline-white">
        {truncateText(travel.title)}
      </p>
      <p className="z-1 text-outline-white">{getFormattedDay()}</p>
      <div className="z-1 flex flex-col">
        {Object.entries(groupedTravelCity).map(([code, cities]) => (
          <div key={code} className="flex items-center justify-center gap-1">
            <span className="">{countryData[code].flagEmoji}</span>
            {cities.map((city, index) => (
              <span
                key={`${city.name}-${index}`}
                className="text-sm text-outline-white"
              >
                {city.name}
                {index !== cities.length - 1 && ','}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
