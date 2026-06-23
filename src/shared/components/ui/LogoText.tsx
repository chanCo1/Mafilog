/**
 * @file: LogoText.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: LogoText 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const logoVariants = cva('', {
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
    font: {
      default: 'font-akaya',
      none: '',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'h3',
    font: 'default',
  },
});

interface ILogoText
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof logoVariants> {
  className?: string;
}

function LogoTextEntity({ className, color, size, font, ...props }: ILogoText) {
  return (
    <div
      className={cn(logoVariants({ size, color, font }), className)}
      {...props}
    >
      Mafilog
    </div>
  );
}

export const LogoText = LogoTextEntity;
