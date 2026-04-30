/**
 * @file: SideModal.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: SideModal 컴포넌트, 오른쪽에서 슬라이드로 노출되는 모달
 */

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Dimmed from '@/shared/components/ui/Dimmed';
import { ReturnButton } from '@/shared/components/ui/ReturnButton';

const sideModalVariants = cva(
  'h-dvh fixed top-0 right-0 z-50 transform bg-white shadow-2xl transition-transform duration-800 ease p-4 flex flex-col gap-3 rounded-l-xl',
  {
    variants: {
      size: {
        lg: 'w-125',
        md: 'w-100',
        sm: 'w-75',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface ISideModal extends VariantProps<typeof sideModalVariants> {
  isOpen: boolean;
  handleClose?: () => void;
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}

function SideModalEntity({
  isOpen,
  size,
  children,
  title,
  handleClose,
  footer,
}: ISideModal) {
  return (
    <>
      <Dimmed
        className={cn(isOpen ? 'visible opacity-100' : 'invisible opacity-0')}
        // onClick={handleClose}
      />
      <div
        className={cn(
          sideModalVariants({ size }),
          'max-mobile:w-11/12',
          `${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
        )}
      >
        <div className='flex item-center justify-between'>
          <span className='text-lg font-bold'>{title}</span>
          <ReturnButton size="lg" onClick={handleClose} />
        </div>
        <div className="scrollbar-hide flex h-full flex-col gap-3 overflow-auto">
          {children}
        </div>
        <div className="flex items-center justify-end gap-1">
          {/* 커스텀 푸터 */}
          {footer}
        </div>
      </div>
    </>
  );
}

export const SideModal = forwardRef(SideModalEntity);
