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
}

export default function PageTemplate({ title, children }: IPageTemplate) {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="flex w-90 flex-col gap-4">
        <ReturnButton label='홈으로' size="sm" path='/' />
        <h1 className="text-xxl p-4 text-center font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
