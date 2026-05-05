/**
 * @file: SelectedChips.tsx
 * @author: chad
 * @since: 2026.05.01 ~
 * @description: SelectedChips 컴포넌트, 선택된 리스트 칩으로 노출
 */

import { Chip } from '@/shared/components/ui/Chip';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ISelectedChips {
  title: string;
  selectedList: IPlaceList[];
  onChipClick: (id: string) => void;
  className?: string;
}

export default function SelectedChips({
  onChipClick,
  selectedList,
  title,
  className,
}: ISelectedChips) {
  return (
    <div className={cn('flex flex-col gap-1 pb-1', className)}>
      <p className="text-primary">{title}</p>
      {selectedList.length ? (
        <div className="scrollbar-hide flex gap-1 overflow-x-auto">
          {selectedList.map((place) => (
            <Chip
              key={place.id}
              className="shrink-0"
              variant="gray"
              suffix={<X className="h-4 w-4" />}
              onClick={() => onChipClick(place.id)}
            >
              {place.name}
            </Chip>
          ))}
        </div>
      ) : (
        <span className="text-text-secondary text-sm">{title}가 없어요</span>
      )}
    </div>
  );
}
