/**
 * @file: CardSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: 카드 스켈레톤 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';

interface ICardSkeleton {
  cardCount?: number;
}

export default function CardSkeleton({ cardCount = 3 }: ICardSkeleton) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {Array.from({ length: cardCount }).map((_, index) => (
        <Skeleton key={index} size="xxxl" />
      ))}
    </div>
  );
}
