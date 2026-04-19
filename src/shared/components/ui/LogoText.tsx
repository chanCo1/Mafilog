/**
 * @file: LogoText.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: LogoText 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const logoVariants = cva('font-bona', {
  variants: {
    color: {
      default: '!text-primary',
      gray: 'text-text-primary',
    },
    size: {
      h3: 'text-h3',
      xxl: 'text-xxl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'h3',
  },
});

interface ILogoText
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof logoVariants> {
  className?: string;
}

function LogoTextEntity(
  { className, color, size }: ILogoText,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={cn(logoVariants({ size, color }), className)}>
      Mafilog
    </div>
  );
}

export const LogoText = React.forwardRef(LogoTextEntity);
