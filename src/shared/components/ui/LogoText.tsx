/**
 * @file: LogoText.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: LogoText 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const logoVariants = cva('font-akaya', {
  variants: {
    color: {
      primary: '!text-primary',
      gray: 'text-text-primary',
      white: '!text-white',
    },
    size: {
      logo: 'text-logo',
      h3: 'text-h3',
      xxl: 'text-xxl',
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'h3',
  },
});

interface ILogoText
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof logoVariants> {
  className?: string;
}

function LogoTextEntity({ className, color, size, ...props }: ILogoText) {
  return (
    <div className={cn(logoVariants({ size, color }), className)} {...props}>
      Mafilog
    </div>
  );
}

export const LogoText = LogoTextEntity;
