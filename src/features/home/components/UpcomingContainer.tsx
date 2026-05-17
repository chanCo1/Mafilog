'use client';

/**
 * @file: UpcomingContainer.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: 홈 > 다가오는 여행 노출
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateNewTravelModal from '@/features/myTravel/components/modal/CreateNewTravelModal';

export default function UpcomingContainer() {
  const [isOpenCreateNewModal, setIsOpenCretateNewModal] = useState(false);

  const { data } = useSession();
  const router = useRouter();

  return (
    <>
      {data ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">다가오는 여행</p>
            <Button size="sm" onClick={() => setIsOpenCretateNewModal(true)}>
              여행 만들기
            </Button>
          </div>
          <p className="text-text-secondary">
            다가오는 여행이 없어요! 다음 여행지는 어디인가요?
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2.5">
          <span className="max-mobile:text-lg text-center text-lg font-bold break-keep">
            매필로그와 함께 일정을 만들고 즐거웠던 여행을 기록해보세요
          </span>
          <Button
            variant="primaryOutline"
            size="sm"
            onClick={() => router.push('/login')}
          >
            로그인
          </Button>
        </div>
      )}

      <CreateNewTravelModal
        isOpen={isOpenCreateNewModal}
        handleClose={() => setIsOpenCretateNewModal(false)}
      />
    </>
  );
}
