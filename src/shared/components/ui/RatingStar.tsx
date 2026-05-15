/**
 * @file: RatingStar.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 별점 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { Star } from 'lucide-react';

interface IRatingStar {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  className?: string;
}

export default function RatingStar({
  value = 0,
  onChange,
  readonly = false,
  className,
}: IRatingStar) {
  const handleRating = (index: number) => {
    if (readonly || !onChange) return;
    onChange(index);
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isActive = value >= starValue;

        return (
          <Star
            key={index}
            size={20}
            className={cn(
              'fill-current transition-colors',
              isActive ? 'text-amber-400' : 'text-gray-200',
              !readonly && 'cursor-pointer hover:scale-110 active:scale-95'
            )}
            onClick={() => handleRating(starValue)}
          />
        );
      })}
    </div>
  );
}
