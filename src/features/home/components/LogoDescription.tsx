/**
 * @file: LogoDescription.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: LogoDescription 컴포넌트 - 로고에 대한 부가설명
 */

import React from 'react';

interface ILogoDescription {
  title: string;
  subTitle: string;
}

export default function LogoDescription({ title, subTitle }: ILogoDescription) {
  return (
    <div className="flex flex-col">
      <span className="text-text-caption">{title}</span>
      <span className="text-text-secondary text-xs">{subTitle}</span>
    </div>
  );
}
