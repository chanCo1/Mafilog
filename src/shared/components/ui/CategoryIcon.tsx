/**
 * @file: CategoryIcon.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: CategoryIcon 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import {
  Plus,
  Plane,
  Bus,
  Utensils,
  ShoppingBasket,
  MapPin,
  House,
  CircleEllipsis,
  Check,
  X,
  StickyNote,
} from 'lucide-react';

const categoryIconVariants = cva(
  'rounded-full flex items-center justify-center border-primary text-primary',
  {
    variants: {
      variant: {
        x: '',
        check: '',
        memo: '',
        plus: '',
        plane: '',
        bus: 'border-secondary text-secondary',
        transport: 'border-secondary text-secondary',
        food: 'border-state-warning text-state-warning',
        shopping: 'border-state-success text-state-success',
        tour: 'border-state-error text-state-error',
        house: 'border-state-info text-state-info',
        etc: 'border-text-primary text-text-primary',
      },
      circled: {
        outline: 'border-2 bg-white',
        none: '',
      },
      size: {
        md: 'w-[30px] h-[30px]',
        sm: 'w-[24px] h-[24px]',
      },
    },
    defaultVariants: {
      variant: 'memo',
      circled: 'outline',
      size: 'md',
    },
  },
);

type TCategoryVariant = VariantProps<typeof categoryIconVariants>['variant'];

interface ICategoryIcon
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryIconVariants> {
  className?: string;
  variant: TCategoryVariant;
}

function CategoryIconEntity({
  className,
  size,
  variant,
  circled,
  children,
  ...props
}: ICategoryIcon) {
  /** variant별 아이콘 크기 */
  const GetIconType = React.useMemo(() => {
    const fiveSize = 'h-5 w-5';
    const fourHalfSize = 'h-4.5 w-4.5';
    const fourSize = 'h-4 w-4';

    switch (variant) {
      case 'check':
        return (
          <Check
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'memo':
        return (
          <StickyNote
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'plus':
        return (
          <Plus
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'plane':
        return (
          <Plane
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'bus':
        return (
          <Bus
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'food':
        return (
          <Utensils
            className={
              circled === 'none'
                ? 'w-full pt-0.5'
                : size === 'sm'
                  ? fourSize
                  : fourHalfSize
            }
          />
        );
      case 'shopping':
        return (
          <ShoppingBasket
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'tour':
        return (
          <MapPin
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'house':
        return (
          <House
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'etc':
        return (
          <CircleEllipsis
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
      case 'x':
        return (
          <X
            className={
              circled === 'none'
                ? 'w-full'
                : size === 'sm'
                  ? fourHalfSize
                  : fiveSize
            }
          />
        );
    }
  }, [variant, size]);

  return (
    <div
      className={cn(
        categoryIconVariants({ size, circled, variant }),
        className,
      )}
      onClick={props.onClick}
    >
      {children}
      {GetIconType}
    </div>
  );
}

export const CategoryIcon = CategoryIconEntity;
