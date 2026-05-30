/**
 * @file: Dropdown.tsx
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: Dropdown 컴포넌트, 드롭다운 컴포넌트. 하위 메뉴는 children으로 받음
 */

import { useState, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useDropdownDirection } from '@/shared/hooks/useDropdownDirection';
import VaulBottomSheet from '@/shared/components/ui/VaulBottomSheet';
import { useDevice } from '@/shared/hooks/useDevice';

interface IDropdown {
  trigger: ReactNode;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function Dropdown({
  trigger,
  className,
  children,
  disabled,
}: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));
  const direction = useDropdownDirection({ isOpen, ref: dropdownRef });
  const { isMobile } = useDevice();

  const handleTrigger = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn('relative flex flex-col items-end', className)}
    >
      <div onClick={handleTrigger}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'scrollbar-hide absolute z-50 flex max-h-45 w-max min-w-30 flex-col gap-1 overflow-auto rounded-lg bg-white p-2 whitespace-nowrap shadow-lg max-mobile:hidden mobile:block',
            direction === 'down' ? 'top-full mt-1' : 'bottom-full mb-1',
          )}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}

      {/* 바텀 시트 */}
      <VaulBottomSheet isOpen={isOpen && isMobile}>{children}</VaulBottomSheet>
    </div>
  );
}
