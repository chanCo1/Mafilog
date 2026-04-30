/**
 * @file: Providers.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: Providers 컴포넌트
 */

'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import Toast from '@/shared/components/ui/Toast';

interface IProviders {}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
        <Toast />
        {children}
      </APIProvider>
    </div>
  );
}
