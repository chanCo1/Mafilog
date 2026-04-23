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
import { Button } from '@/shared/components/ui/Button';

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
  handleOk?: () => void;
  children: ReactNode;
  okLabel: string;
  cancelLabel: string;
  title?: string;
}

function SideModalEntity({
  isOpen,
  size,
  children,
  okLabel,
  cancelLabel,
  title,
  handleClose,
  handleOk,
}: ISideModal) {
  return (
    <>
      <Dimmed
        className={cn(isOpen ? 'visible opacity-100' : 'invisible opacity-0')}
        onClick={handleClose}
      />
      <div
        className={cn(
          sideModalVariants({ size }),
          'max-mobile:w-11/12 max-mobile:p-3',
          `${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
        )}
      >
        <ReturnButton label={title} size="lg" onClick={handleClose} />
        <div className="flex h-full flex-col gap-3 overflow-auto scrollbar-hide">
          {children}
        </div>
        <div className="flex items-center justify-end">
          <div className="flex gap-1">
            {cancelLabel && (
              <Button variant="gray" onClick={handleClose}>
                {cancelLabel}
              </Button>
            )}
            {okLabel && <Button onClick={handleOk}>{okLabel}</Button>}
          </div>
        </div>
      </div>
    </>
  );
}

export const SideModal = forwardRef(SideModalEntity);
