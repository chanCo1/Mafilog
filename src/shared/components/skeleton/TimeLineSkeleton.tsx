/**
 * @file: TimeLineSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: TimeLineSkeleton 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';

export default function TimeLineSkeleton() {
  return (
    <div className="flex w-full items-start gap-3">
      <Skeleton
        className="shrink-0 w-8 h-8"
        shape="circle"
      />
      <Skeleton size="lg" className='w-full' />
    </div>
  );
}
