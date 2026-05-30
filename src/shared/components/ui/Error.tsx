/**
 * @file: Error.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: ErrorBoundary에서 에러 발생 시 보여줄 공통 컴포넌트
 */

import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();

  // 💡 401 에러(인증 만료)인지 확인
  const isUnauthorized =
    (error as Error).message.includes('401') ||
    (error as any).response?.status === 401;

  return (
    <div className="flex h-full min-h-75 w-full flex-col items-center justify-center rounded-lg p-6 text-center">
      <AlertCircle className="text-text-secondary mb-4 h-12 w-12" />

      <h2 className="text-text-primary mb-2 text-lg font-bold">
        {isUnauthorized
          ? '로그인이 필요합니다'
          : '일시적인 오류가 발생했습니다'}
      </h2>

      <p className="text-text-secondary mb-6 text-sm">
        {isUnauthorized
          ? '다시 로그인해 주세요'
          : '데이터를 불러오는 중 문제가 발생했습니다 잠시 후 다시 시도해 주세요'}
      </p>

      <div className="flex gap-2.5">
        <Button onClick={() => router.push('/')}>
          <Home className="mr-1.5 h-4 w-4" />
          홈으로
        </Button>
        <Button variant="gray" onClick={resetErrorBoundary}>
          <RefreshCcw className="mr-1.5 h-4 w-4" />
          다시 시도
        </Button>
      </div>
    </div>
  );
}
