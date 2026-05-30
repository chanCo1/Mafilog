/**
 * @file: MyPageLayout.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 마이페이지 레이아웃 컴포넌트
 */

'use client';

import { ReactNode } from 'react';
import { MYPAGE_LIST } from '@/shared/constants';
import PageHeader from '@/shared/components/ui/PageHeader';
import { Card } from '@/shared/components/ui/Card';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import { useSession } from 'next-auth/react';

interface IMyPageLayout {
  children: ReactNode;
}

export default function MyPageLayout({ children }: IMyPageLayout) {
  const router = useRouter();
  const path = usePathname();

  const { data: userInfo } = useSession();

  /** 페이지 이동 핸들링 */
  const handelLinkPage = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        title="마이페이지"
        description={`안녕하세요. ${userInfo?.user?.name}님!`}
      />
      <div className="max-mobile:flex-col max-mobile:gap-1 flex gap-5">
        <Card className="text-text-secondary max-mobile:hidden sticky top-13 mt-4 flex h-50 w-50 shrink-0 flex-col gap-1">
          {MYPAGE_LIST.map((list) => (
            <p
              key={list.path}
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
              key={list.path}
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
