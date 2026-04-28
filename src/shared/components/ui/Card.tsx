/**
 * @file: Card.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Card 컴포넌트
 */

'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const cardVariants = cva('rounded-lg cursor-pointer bg-white', {
  variants: {
    variant: {
      default: 'bg-gray-1',
      outline: 'border border-border-primary',
      shadowed: 'bg-gray-1 shadow-md',
      white: '',
      shadowedWhite: 'shadow-md',
      dashed: 'border border-dashed border-border-primary'
    },
    size: {
      md: 'p-2.5',
      sm: 'p-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface ICard
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
}

function CardEntity(
  { className, disabled, variant, size, readonly, ...props }: ICard,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [isSelected, setIsSelected] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (props.onClick) {
      props.onClick(e);
    }

    setIsSelected(!isSelected);
  };

  return (
    <div
      className={cn(
        cardVariants({ variant, size }),
        disabled && 'pointer-events-none opacity-50',
        readonly && 'pointer-events-none',
        isSelected && 'border-border-active border-2',
        className,
      )}
      ref={ref}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
}

export const Card = React.forwardRef(CardEntity);
