/**
 * @file: ScheduleSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: ScheduleSkeleton 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';
import TimeLineSkeleton from '@/shared/components/skeleton/TimeLineSkeleton';

export default function ScheduleSkeleton() {
  return (
    <div className="max-mobile:flex-col-reverse flex gap-4">
      <div className="max-mobile:w-full flex w-1/2 flex-col gap-2">
        <div className="flex justify-between">
          <Skeleton size="md" className="w-18" />
          <div className="flex gap-1">
            <Skeleton size="md" className="w-18" />
            <Skeleton size="md" className="w-35" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <Skeleton className="w-35" />
            <TimeLineSkeleton />
            <TimeLineSkeleton />
            <TimeLineSkeleton />
          </div>
        ))}
      </div>
      <div className="max-mobile:w-full flex w-1/2 flex-col gap-2">
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              shape="circle"
              size="md"
              className='w-12'
            />
          ))}
        </div>
        <Skeleton className='h-80' />
      </div>
    </div>
  );
}
