/**
 * @file: Toast.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: Toast 컴포넌트
 */

import { Toaster } from 'sonner';

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      richColors
      duration={3500}
      icons={{
        success: null,
        info: null,
        warning: null,
        error: null,
        loading: null,
      }}
    />
  );
}
