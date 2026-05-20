/**
 * @file: Providers.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: Providers 컴포넌트
 */

'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import Toast from '@/shared/components/ui/Toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Dialog } from '@/shared/components/ui/Dialog';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface IProviders {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: IProviders) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={false}
      >
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
          <Toast />
          <Dialog />
          {children}
          {/* 개발 환경에서만 React Query Devtools 표시 */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="top-left"
            />
          )}
        </APIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
