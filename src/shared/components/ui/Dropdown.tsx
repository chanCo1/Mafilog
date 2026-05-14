/**
 * @file: Dropdown.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: Dropdown 컴포넌트, 드롭다운 컴포넌트. 하위 메뉴는 children으로 받음
 */

import { useState, ReactNode, useLayoutEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';

interface IDropdown {
  trigger: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Dropdown({ trigger, className, children }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  // 열릴 때 위치 계산
  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownMaxHeight = 200;

      // 하단 여유 공간이 드롭다운 높이보다 작으면 위로 띄움
      if (viewportHeight - rect.bottom < dropdownMaxHeight) {
        setDirection('up');
      } else {
        setDirection('down');
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={cn('relative flex flex-col items-end', className)}
    >
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'scrollbar-hide absolute z-50 flex max-h-50 w-max min-w-30 flex-col gap-1 overflow-auto rounded-lg bg-white p-2 whitespace-nowrap shadow-lg',
            direction === 'down' ? 'top-full mt-1' : 'bottom-full mb-1',
          )}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
