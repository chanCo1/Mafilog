/**
 * @file: Alert.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: Alert 컴포넌트
 */

import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Button } from '@/shared/components/ui/Button';

const alertVariants = cva('', {
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
});

interface IAlert extends VariantProps<typeof alertVariants> {
  className?: string;
  type: 'alert' | 'confirm';
  title: string;
  okLabel?: string;
  cancelLabel?: string;
}

function AlertEntity({
  size,
  variant,
  className,
  title,
  type,
  cancelLabel = '닫기',
  okLabel = '확인',
}: IAlert) {
  return (
    <div
      className={cn(
        alertVariants({ variant, size }),
        'flex flex-col gap-2.5 rounded-lg bg-white p-2.5',
        className,
      )}
    >
      <p>{title}</p>
      <div className="flex justify-end gap-1">
        {type === 'confirm' && (
          <Button variant="gray" size="xs">
            {cancelLabel}
          </Button>
        )}
        <Button size="xs">{okLabel}</Button>
      </div>
    </div>
  );
}

export const Alert = forwardRef(AlertEntity);
