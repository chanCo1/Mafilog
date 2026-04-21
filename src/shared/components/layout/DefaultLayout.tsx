/**
 * @file: DefaultLayout.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: DefaultLayout 컴포넌트
 */

import React from 'react';
import Header from '@/shared/components/layout/Header';
import Footer from '@/shared/components/layout/Footer';
import { DEFAULT_LAYOUT_CLASSNAME } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-1">
        <Header />
      </div>
      <div className={cn(DEFAULT_LAYOUT_CLASSNAME, 'w-full flex-1 px-3 py-7')}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
