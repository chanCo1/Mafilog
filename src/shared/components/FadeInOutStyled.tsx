/**
 * @file: FadeInOutStyled.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: 부드럽게 사라지고 나타나는 효과 컴포넌트,
 *               (필수)사용시 부모 태그에 relative 적용
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface IFadeInOutStyled {
  clasName?: string;
  isShow: boolean;
  children: ReactNode;
}

export default function FadeInOutStyled({
  isShow,
  children,
  clasName,
}: IFadeInOutStyled) {
  return (
    <div
      className={cn(
        'w-full transition-all duration-300 ease-in-out h-full',
        isShow
          ? 'visible relative translate-y-0 opacity-100 z-10'
          : 'invisible absolute top-0 left-0 overflow-hidden pointer-events-none translate-y-4 opacity-0',
        clasName,
      )}
    >
      {children}
    </div>
  );
}
