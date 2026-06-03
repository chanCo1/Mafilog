/**
 * @file: SideModal.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: SideModal 컴포넌트, 오른쪽에서 슬라이드로 노출되는 모달
 */

import { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Dimmed from '@/shared/components/ui/Dimmed';
import { ReturnButton } from '@/shared/components/ui/ReturnButton';

const sideModalVariants = cva(
  'h-dvh fixed top-0 right-0 z-20 transform bg-white transition-transform duration-800 ease p-4 flex flex-col gap-3 rounded-l-xl justify-between',
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
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   // SSR 에러 방지
  //   setIsMounted(true);
  //   if (isOpen)
  //     // 뒷 화면 스크롤 제거
  //     document.body.style.overflow = 'hidden';
  //   else document.body.style.overflow = 'unset';

  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
    }

    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMounted]);

  if (!isMounted) return null;
  // if (!isRender) return null;

  return createPortal(
    <>
      <Dimmed
        className={cn(
          // isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          isVisible ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        // onClick={handleClose}
      />
      <div
        className={cn(
          sideModalVariants({ size }),
          'max-mobile:w-full max-mobile:rounded-l-none',
          // `${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`,
          `${isVisible ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`,
        )}
      >
        <div className="item-center flex justify-between">
          <span className="text-lg font-bold">{title}</span>
          <ReturnButton size="lg" onClick={handleClose} />
        </div>
        <div className={cn('min-h-0 flex-1', !isVisible && 'invisible')}>
          {children}
        </div>
        <div className="border-border-secondary flex items-center justify-end gap-1 border-t pt-2">
          {/* 커스텀 푸터 */}
          {footer}
        </div>
      </div>
    </>,
    document.body,
  );
}

export const SideModal = SideModalEntity;
