/**
 * @file: CircledNumber.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: CircledNumber 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const circledNumberVariants = cva('rounded-full flex items-center justify-center', {
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      red: 'bg-state-error text-white',
      primaryOutline: 'border-2 border-primary text-primary',
      redOutline: 'border-2 border-state-error text-state-error',
    },
    size: {
      md: 'w-[30px] h-[30px] text-lg',
      sm: 'w-[24px] h-[24px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ICircledNumber
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circledNumberVariants> {
  className?: string;
  number: string | number;
}

function CircledNumberEntity(
  { number, className, size, variant }: ICircledNumber,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      className={cn(circledNumberVariants({ size, variant }), className)}
      ref={ref}
    >
      <span>{number}</span>
    </div>
  );
}

export const CircledNumber = React.forwardRef(CircledNumberEntity);
