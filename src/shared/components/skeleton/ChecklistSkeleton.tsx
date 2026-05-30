/**
 * @file: ChecklistSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: 체크리스트 스켈레톤 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';

export default function ChecklistSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className='w-2/6' />
          <Skeleton className='w-3/5' />
          <Skeleton className='w-3/5' />
          <Skeleton className='w-3/5' />
          <Skeleton className='w-3/5' />
          <Skeleton shape='circle' style={{ width: '25px' }}  />
        </div>
      ))}
    </div>
  );
}
