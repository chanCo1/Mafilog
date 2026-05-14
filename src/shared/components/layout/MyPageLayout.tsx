/**
 * @file: MyPageLayout.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 마이페이지 레이아웃 컴포넌트
 */

'use client';

import { ReactNode, useState } from 'react';
import { MYPAGE_LIST } from '@/shared/constants';
import PageHeader from '@/shared/components/ui/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';

interface IMyPageLayout {
  children: ReactNode;
}

export default function MyPageLayout({ children }: IMyPageLayout) {
  const router = useRouter();
  const path = usePathname();

  /** 페이지 이동 핸들링 */
  const handelLinkPage = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="마이페이지"
        description={`안녕하세요. ${'여행최고'}님!`}
      />
      <div className="max-mobile:flex-col flex gap-5 max-mobile:gap-1">
        <Card className="text-text-secondary max-mobile:hidden flex w-50 flex-col gap-1 shrink-0 sticky top-13 h-50 mt-4">
          {MYPAGE_LIST.map((list) => (
            <p
              className={cn(
                'cursor-pointer rounded-lg p-2',
                path === list.path
                  ? 'text-text-primary bg-gray-2 font-bold'
                  : 'hover:bg-gray-2',
              )}
              onClick={() => handelLinkPage(list.path)}
            >
              {list.name}
            </p>
          ))}
        </Card>
        <div className="mobile:hidden flex gap-1">
          {MYPAGE_LIST.map((list) => (
            <Chip
              variant={path === list.path ? 'primary' : 'gray'}
              onClick={() => handelLinkPage(list.path)}
            >
              {list.name}
            </Chip>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
