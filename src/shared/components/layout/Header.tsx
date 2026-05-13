/**
 * @file: Header.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: Header 컴포넌트
 */

'use client';

import React, { useState } from 'react';
import { LogoText } from '@/shared/components/ui/LogoText';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/utils';
import { DEFAULT_LAYOUT_CLASSNAME } from '@/shared/constants';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthManagerStore } from '@/shared/stores/useAuthManagerStore';
import UserInfoModal from '@/features/home/components/modal/UserInfoModal';

export default function Header() {
  const router = useRouter();
  const path = usePathname();

  const isMyTravelPage = path.includes('my-travel');
  const isMyMapPage = path.includes('my-map');

  const { isLoggedIn } = useAuthManagerStore();

  const [isOpenUserInfoModal, setIsOpenUserInfoModal] = useState(false);

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
        {isLoggedIn ? (
          <div className="flex items-center justify-between gap-3">
            <div className="max-mobile:hidden text-text-secondary flex items-center justify-between gap-3">
              <Link
                href="/my-travel"
                className={cn(isMyTravelPage && 'text-text-primary font-bold')}
              >
                내 여행
              </Link>
              <Link
                href="/my-map"
                className={cn(isMyMapPage && 'text-text-primary font-bold')}
              >
                추억 채우기
              </Link>
            </div>
            <Menu
              className="text-primary cursor-pointer"
              onClick={() => setIsOpenUserInfoModal(true)}
            />
          </div>
        ) : (
          <Button size="sm" onClick={() => router.push('/login')}>
            로그인/회원가입
          </Button>
        )}
      </div>
      <UserInfoModal
        isOpen={isOpenUserInfoModal}
        handleClose={() => setIsOpenUserInfoModal(false)}
      />
    </header>
  );
}
