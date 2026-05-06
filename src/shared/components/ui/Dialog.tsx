/**
 * @file: Dialog.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: Dialog 컴포넌트
 */

import { ForwardedRef, forwardRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Button } from '@/shared/components/ui/Button';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { createPortal } from 'react-dom';
import Dimmed from '@/shared/components/ui/Dimmed';

const dialogVariants = cva(
  'z-50 transition duration-800 ease absolute flex items-center justify-cetner flex flex-col gap-2.5 rounded-lg bg-white p-2.5 shadow-md',
  {
    variants: {
      variant: {
        default: '',
        error: '',
      },
      size: {
        lg: 'w-100',
        md: 'w-75',
        sm: 'w-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface IAlert extends VariantProps<typeof dialogVariants> {
  className?: string;
}

function DialogEntity(
  { size, variant, className }: IAlert,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { isOpen, options, closeDialog } = useDialogStore();

  const handleOk = () => {
    options?.onOk?.();
    closeDialog();
  };

  const handleCancel = () => {
    options?.onCancel?.();
    closeDialog();
  };

  useEffect(() => {
    if (isOpen)
      // 뒷 화면 스크롤 제거
      document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isConfirm = options?.type === 'confirm';

  return createPortal(
    <div
      className={cn(
        'absolute z-100 flex h-full w-full items-center justify-center',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <Dimmed
        className={cn(isOpen ? 'visible opacity-100' : 'invisible opacity-0')}
        // onClick={handleClose}
      />
      <div
        className={cn(
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          dialogVariants({ variant, size }),
          className,
        )}
        ref={ref}
      >
        <p className="w-full py-7 text-center">{options?.message}</p>
        <div
          className={cn(
            'flex w-full items-center gap-1',
            isConfirm ? 'justify-center' : 'justify-end',
          )}
        >
          {isConfirm && (
            <Button
              variant="ghost"
              className="text-text-secondary w-1/2"
              onClick={handleCancel}
            >
              {options?.cancelLabel || '취소'}
            </Button>
          )}
          {isConfirm && <span className="text-gray-2">|</span>}
          <Button
            variant="ghost"
            className={cn('text-primary', isConfirm ? 'w-1/2' : 'w-1/3')}
            onClick={handleOk}
          >
            {options?.okLabel || '확인'}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export const Dialog = forwardRef(DialogEntity);
