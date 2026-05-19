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

const cardVariants = cva('rounded-lg bg-white', {
  variants: {
    variant: {
      default: 'bg-gray-1',
      outline: 'ring ring-inset ring-border-primary',
      shadowed: 'bg-gray-1 shadow-md',
      white: '',
      shadowedWhite: 'shadow-md',
      dashed: 'border border-dashed border-border-primary',
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
  select?: boolean; // 선택 사용
  isSelected?: boolean; // 선택되었는지 여부
}

function CardEntity(
  { className, disabled, variant, size, readonly, select, isSelected, ...props }: ICard,
) {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      className={cn(
        cardVariants({ variant, size }),
        select ? 'cursor-pointer' : '',
        disabled && 'pointer-events-none opacity-50',
        readonly && 'pointer-events-none',
        isSelected && 'ring-border-active ring-2 ring-inset',
        className,
      )}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
}

export const Card = CardEntity;
