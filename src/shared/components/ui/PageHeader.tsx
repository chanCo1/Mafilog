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
    <div className="flex flex-col">
      {ruby}
      <div className="flex gap-1">
        <h3 className="text-h3 font-bold max-mobile:text-xxl">{title}</h3>
        {titleBtn}
      </div>
      {description && (
        <span className="text-text-secondary text-lg">{description}</span>
      )}
    </div>
  );
}
