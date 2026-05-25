/**
 * @file: TravelListCard.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: TravelListCard 컴포넌트, 여행 리스트 카드
 */

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/Badge';
import { calcDDay } from '@/shared/lib/utils';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';
import { Card } from '@/shared/components/ui/Card';
import Image from 'next/image';
import { truncateText, convertTravelDateRange } from '@/shared/lib/utils';
import TravelCityGroup from '@/features/myTravel/components/main/TravelCityGroup';

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
  return (
    <Card
      className={cn(
        'bg-gray-5 relative flex h-45 cursor-pointer flex-col items-center justify-center text-white transition-all hover:shadow-sm overflow-hidden',
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
          className="z-0 rounded-lg object-fill"
        />
      )}
      {calcDDay(travel.from) > 0 ? (
        <div className="absolute top-2 right-2">
          <Badge>D-{calcDDay(travel.from)}</Badge>
        </div>
      ) : null}
      <p className="text-outline-white z-1 text-center text-lg font-bold">
        {truncateText(travel.title, 20)}
      </p>
      <p className="text-outline-white z-1">
        {convertTravelDateRange(travel.from, travel.to)}
      </p>
      <div className='text-outline-white z-1'>
        <TravelCityGroup cities={travel.cities} />
      </div>
    </Card>
  );
}
