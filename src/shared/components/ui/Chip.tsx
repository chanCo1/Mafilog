/**
 * @file: Chip.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Chip 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariants = cva(
  'flex gap-1 cursor-pointer font-bold rounded-2xl items-center justify-center disabled:pointer-events-none disabled:opacity-50 hover:opacity-90 text-white w-fit transition shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        gray: 'bg-gray-2 text-text-primary',
        ghost: 'hover:bg-gray-1 text-text-primary',
        primaryOutline: 'ring ring-inset ring-priamry text-primary',
        redOutline: 'ring ring-inset ring-state-error text-state-error',
        none: 'bg-transparent text-text-primary',
      },
      size: {
        lg: 'px-4 py-2.5 text-md',
        md: 'px-2.5 py-2 text-sm',
        sm: 'px-2 py-1 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface IChip
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>,
    VariantProps<typeof chipVariants> {
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

function ChipEntity({
  className,
  prefix,
  suffix,
  variant,
  size,
  ...props
}: IChip) {
  return (
    <button
      className={cn(chipVariants({ variant, size }), className)}
      {...props}
    >
      {/* prefix 노출 */}
      {prefix && <span className="flex items-center">{prefix}</span>}
      {/* 칩안에 내용 노출 */}
      {props.children && <span>{props.children}</span>}
      {/* suffix 노출 */}
      {suffix && <span className="flex items-center">{suffix}</span>}
    </button>
  );
}

export const Chip = ChipEntity;
