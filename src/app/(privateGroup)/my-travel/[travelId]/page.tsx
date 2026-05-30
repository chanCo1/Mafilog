import MyTravelDetailPage from '@/features/myTravel/pages/MyTravelDetailPage';
import { Suspense } from 'react';
import TravelDetailSkeleton from '@/shared/components/skeleton/TravelDetailSkeleton';
import Error from '@/shared/components/ui/Error';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Page() {
  return (
    <ErrorBoundary fallbackRender={Error}>
      <Suspense fallback={<TravelDetailSkeleton />}>
        <MyTravelDetailPage />
      </Suspense>
    </ErrorBoundary>
  );
}
