/**
 * @file: Badge.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: Badge 컴포넌트
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const badgeVariants = cva('', {
  variants: {
    size: {
      md: 'p-2',
      sm: 'p-1',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface IBadge extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: ReactNode;
}

function BadgeEntity({ children, className, size }: IBadge) {
  return (
    <div
      className={cn(
        badgeVariants({ size }),
        'bg-gray-8 rounded-md text-sm text-white',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const Badge = BadgeEntity;
