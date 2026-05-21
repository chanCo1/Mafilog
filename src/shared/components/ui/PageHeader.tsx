/**
 * @file: PageHeader.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: PageHeader 컴포넌트
 */

import { ReactNode } from 'react';

interface IPageHeader {
  ruby?: ReactNode;
  title: string;
  description?: ReactNode;
  titleBtn?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  titleBtn,
  ruby,
}: IPageHeader) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {ruby}
      </div>
      <div className="flex gap-1 items-baseline">
        <h3 className="text-h3 max-mobile:text-xxl font-bold">{title}</h3>
        {titleBtn}
      </div>
      {description && (
        <span className="text-text-secondary text-lg">{description}</span>
      )}
    </div>
  );
}
