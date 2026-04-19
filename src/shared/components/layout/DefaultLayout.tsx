/**
 * @file: DefaultLayout.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: DefaultLayout 컴포넌트
 */

import React from 'react';
import Header from '@/shared/components/layout/Header';
import Footer from '@/shared/components/layout/Footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='sticky top-0 z-1'>
        <Header />
      </div>
      <div className="flex-1 desktop:w-desktop tablet:w-tablet mx-auto px-3 py-7 w-full">
        {children}
      </div>
      <div className='sticky bottom-0 z-1'>
        <Footer />
      </div>
    </div>
  );
}
