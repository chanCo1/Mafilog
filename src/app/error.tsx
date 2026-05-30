'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center pt-50">
      <h2 className="mb-4 text-2xl">문제가 발생했습니다</h2>
      <div className="flex gap-2">
        <Button onClick={() => router.push('/')}>홈으로</Button>
        <Button variant='gray' onClick={() => reset()}>다시 시도</Button>
      </div>
    </div>
  );
}
