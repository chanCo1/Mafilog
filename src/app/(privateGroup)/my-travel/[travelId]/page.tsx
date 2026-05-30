import MyTravelDetailPage from '@/features/myTravel/pages/MyTravelDetailPage';
import { Suspense } from 'react';
import TravelDetailSkeleton from '@/shared/components/skeleton/TravelDetailSkeleton';

export default async function Page() {
  return (
    <Suspense fallback={<TravelDetailSkeleton />}>
      <MyTravelDetailPage />
    </Suspense>
  );
}
