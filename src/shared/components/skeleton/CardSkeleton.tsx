/**
 * @file: CardSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: 카드 스켈레톤 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';

export default function CardSkeleton() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Skeleton size='xxxl' />
      <Skeleton size='xxxl' />
      <Skeleton size='xxxl' />
    </div>
  );
}
