/**
 * @file: FadeInOutStyled.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: FadeInOutStyled 컴포넌트, 부드럽게 사라지고 나타나는 효과,
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
        'h-full w-full transition-all duration-500 ease-in-out',
        isShow
          ? 'visible relative translate-y-0 opacity-100'
          : 'pointer-events-none invisible absolute top-0 left-0 w-full translate-y-4 opacity-0',
        clasName,
      )}
    >
      {children}
    </div>
  );
}
