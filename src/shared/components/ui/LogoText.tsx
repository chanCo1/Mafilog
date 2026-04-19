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
      xxl: 'text-xxl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'xxl',
  },
});

interface ILogoText extends VariantProps<typeof logoVariants> {
  className?: string;
}

function LogoTextInner(
  { className, color, size }: ILogoText,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={cn(logoVariants({ size, color, className }))}>
      Mafilog
    </div>
  );
}

export const LogoText = React.forwardRef(LogoTextInner);