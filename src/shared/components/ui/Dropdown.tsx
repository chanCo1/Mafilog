/**
 * @file: Dropdown.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: Dropdown 컴포넌트, 드롭다운 컴포넌트. 하위 메뉴는 children으로 받음
 */

import { useState, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface IDropdown {
  trigger: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Dropdown({ trigger, className, children }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('flex flex-col items-end', className)}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 flex flex-col gap-1 rounded-lg bg-white p-2 shadow-md top-12 max-h-50 overflow-auto scrollbar-hide',
          )}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
