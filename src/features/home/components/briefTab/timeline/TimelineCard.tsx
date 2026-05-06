/**
 * @file: TimelineCard.tsx
 * @author: chad
 * @since: 2026.04.22 ~
 * @description: TimelineCard 컴포넌트
 */

import { useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { Chip } from '@/shared/components/ui/Chip';
import { TRAVEL_TYPE, ICON_TYPE } from '@/shared/types/Enum';
import { TIconList } from '@/shared/types/expenseEnum';

interface ITimelineCard {
  name: string;
  type: TRAVEL_TYPE;
  index: string | number;
  style: string[];
  partner: string;
}

export default function TimelineCard({
  name,
  index,
  partner,
  style,
  type,
}: ITimelineCard) {
  const getTravelType = useMemo(() => {
    switch (type) {
      case TRAVEL_TYPE.WORLD:
        return ICON_TYPE.PLANE;
      case TRAVEL_TYPE.DOMESTIC:
        return ICON_TYPE.BUS;
      default:
        return ICON_TYPE.BUS;
    }
  }, [type]);

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          <CategoryIcon variant={getTravelType as TIconList} />
        </div>
        <div
          className={cn(
            'border-primary w-px flex-1 border',
            index === 1 && 'border-dashed',
          )}
        />
      </div>
      <div className="w-full pb-2.5">
        <Card
          variant="shadowedWhite"
          className="flex flex-col items-start justify-center"
        >
          <div className="flex items-center gap-1">
            <span className="text-text-secondary">#{index}</span>
            <p className="text-lg font-bold">{name}</p>
          </div>
          <div className="flex gap-1">
            <Chip variant="gray" size="sm">
              #{partner}
            </Chip>
            {style.map((_style) => (
              <Chip key={_style} variant="gray" size="sm">
                #{_style}
              </Chip>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
