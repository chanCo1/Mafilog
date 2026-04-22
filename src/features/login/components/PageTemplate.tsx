/**
 * @file: PageTemplate.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: PageTemplate 컴포넌트, 로그인, 회원가입 페이지 템플릿
 */

import { ReactNode } from 'react';

interface IPageTemplate {
  title: string;
  children: ReactNode;
}

export default function PageTemplate({ title, children }: IPageTemplate) {
  return (
    <div className="mx-auto flex justify-center">
      <div className="flex w-90 flex-col gap-4">
        <h1 className="text-xxl p-4 text-center font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}
