/**
 * @file: StatisticsSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: StatisticsSkeleton 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';

export default function StatisticsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className='flex justify-center'>
        <Skeleton shape="circle" className="h-70 w-70" />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} size="lg" />
      ))}
    </div>
  );
}
