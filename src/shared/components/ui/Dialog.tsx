/**
 * @file: Dialog.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: Dialog 컴포넌트
 */

import { useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/Button';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { createPortal } from 'react-dom';
import Dimmed from '@/shared/components/ui/Dimmed';
import { useIsMounted } from '@/shared/hooks/useIsMounted';

interface IDialog {
  className?: string;
}

function DialogEntity({ className }: IDialog) {
  const { isOpen, options, closeDialog } = useDialogStore();
  const isMounted = useIsMounted();

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

  if (!isMounted) return null;

  const isConfirm = options?.type === 'confirm';

  return createPortal(
    <div
      className={cn(
        'fixed z-100 inset-0 flex h-full w-full items-center justify-center pointer-events-auto',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <Dimmed
        className={cn(isOpen ? 'visible opacity-100' : 'invisible opacity-0')}
        // onClick={handleClose}
      />
      <div
        className={cn(
          'ease justify-cetner absolute flex w-75 flex-col items-center gap-2.5 rounded-lg bg-white p-2.5 shadow-md transition duration-200 z-50',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          options?.type === 'error' && 'border-state-error border-2',
          className,
        )}
      >
        <div className="w-full py-7 text-center">{options?.message}</div>
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
            className={cn(
              'text-primary',
              isConfirm ? 'w-1/2' : 'w-1/3',
              options?.type === 'error' && 'text-state-error',
            )}
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

export const Dialog = DialogEntity;
