/**
 * @file: PageTemplate.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: PageTemplate 컴포넌트, 로그인, 회원가입 페이지 템플릿
 */

import { ReactNode } from 'react';
import { ReturnButton } from '@/shared/components/ui/ReturnButton';

interface IPageTemplate {
  title: string;
  children: ReactNode;
  backBtnLabel?: string;
  path?: string;
}

export default function PageTemplate({
  title,
  children,
  backBtnLabel = '뒤로가기',
  path,
}: IPageTemplate) {
  return (
    <div className="mx-auto flex flex-col items-center max-w-90">
      <div className="flex flex-col gap-4 w-full">
        <ReturnButton label={backBtnLabel} size="sm" path={path} position='left' />
        <h1 className="text-xxl p-4 text-center font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
