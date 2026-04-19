/**
 * @file: Footer.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: Footer 컴포넌트
 */

import React from 'react';
import { LogoText } from '@/shared/components/ui/LogoText';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t-4 border-border-active h-48 bg-white'>
      <div className='desktop:w-desktop tablet:w-tablet mx-auto px-3 py-5 h-full'>
        <Link href={'/'}><LogoText color="gray" /></Link>
        <p>박찬우 포트폴리오</p>
      </div>
    </footer>
  );
}
