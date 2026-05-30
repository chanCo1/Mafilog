/**
 * @file: TravelDetailSkeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: 내 여행 상세 스켈레톤 컴포넌트
 */

import { Skeleton } from '@/shared/components/skeleton/Skeleton';

export default function TravelDetailSkeleton() {
  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col gap-1">
        <Skeleton style={{ width: '60px' }} />
        <Skeleton style={{ width: '80px' }} />
        <Skeleton style={{ width: '240px' }} size='md' />
        <Skeleton style={{ width: '300px' }} />
      </div>
      <div className='flex items-baseline justify-between'>
        <div className='flex gap-2'>
          <Skeleton style={{ width: '60px' }} shape='circle' size='md' />
          <Skeleton style={{ width: '60px' }} shape='circle' size='md' />
        </div>
        <div className='flex gap-2'>
          <Skeleton style={{ width: '70px' }} />
          <Skeleton style={{ width: '70px' }} />
        </div>
      </div>
    </div>
  );
}
