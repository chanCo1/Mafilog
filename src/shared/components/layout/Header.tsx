/**
 * @file: Header.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: Header 컴포넌트
 */

'use client';

import React from 'react';
import { LogoText } from '@/shared/components/ui/LogoText';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/utils';
import { DEFAULT_LAYOUT_CLASSNAME } from '@/shared/constants';

export default function Header() {
  const isLoggined = false;

  return (
    <header className="border-border-active border-b-2 bg-white">
      <div
        className={cn(
          DEFAULT_LAYOUT_CLASSNAME,
          'flex items-center justify-between px-3 py-1.5',
        )}
      >
        <Link href={'/'}>
          <LogoText />
        </Link>
        {isLoggined ? (
          <div className="flex items-center justify-between gap-3">
            <div className="max-mobile:hidden flex items-center justify-between gap-3">
              <Link href="/" className="">
                내 여행
              </Link>
              <Link href="/" className="">
                추억 채우기
              </Link>
            </div>
            <Menu className="text-primary h-7 w-7 cursor-pointer" />
          </div>
        ) : (
          <Button size="sm">로그인/회원가입</Button>
        )}
      </div>
    </header>
  );
}
