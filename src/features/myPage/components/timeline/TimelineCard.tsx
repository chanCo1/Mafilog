/**
 * @file: TimelineCard.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 마이페이지 > 타임라인 카드 컴포넌트
 */

import { cn, truncateText } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { Chip } from '@/shared/components/ui/Chip';
import {
  convertTravelDateRange,
  convertTravelPartner,
  convertTravelStyle,
} from '@/shared/lib/utils';
import { IMyTravelListResponse } from '@/features/myTravel/interfaces/myTravel.interface';
import TravelCityGroup from '@/features/myTravel/components/main/TravelCityGroup';

interface ITimelineCard {
  className?: string;
  index: number;
  isSelected: boolean;
  list: IMyTravelListResponse;
}

export default function TimelineCard({
  className,
  index = 1,
  isSelected,
  list,
}: ITimelineCard) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-text-secondary">
        {convertTravelDateRange(list.from, list.to)}
      </span>
      <Card select className="flex flex-col gap-3" isSelected={isSelected}>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-text-secondary font-bold">#{index}</span>
            <h3 className="text-lg font-bold">
              {truncateText(list.title, 25)}
            </h3>
          </div>
          <TravelCityGroup cities={list.cities} />
          <div className="flex gap-1">
            <Chip size="sm" variant="gray">
              #{convertTravelPartner(list.travelPartner)}
            </Chip>
            {list.travelStyles.map((style) => (
              <Chip size="sm" variant="gray">
                #{convertTravelStyle(style)}
              </Chip>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
