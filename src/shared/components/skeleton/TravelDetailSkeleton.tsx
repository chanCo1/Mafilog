/**
 * @file: TravelDetailSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: 내 여행 상세 스켈레톤 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import ScheduleSkeleton from '@/shared/components/skeleton/ScheduleSkeleton';

export default function TravelDetailSkeleton() {
  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col gap-1">
        <Skeleton className='w-15' />
        <Skeleton className='w-20' />
        <Skeleton className='w-60' size='md' />
        <Skeleton className='w-75' />
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='flex gap-2'>
          <Skeleton className='w-15' shape='circle' size='md' />
          <Skeleton className='w-15' shape='circle' size='md' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='w-18' />
          <Skeleton className='w-18' />
        </div>
      </div>
      <ScheduleSkeleton />
    </div>
  );
}
