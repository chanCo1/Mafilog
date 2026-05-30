/**
 * @file: Loading.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: Loading 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Plane } from 'lucide-react';

const loadingVariants = cva('animate-spin', {
  variants: {
    size: {
      lg: 'h-8 w-8',
      md: 'h-6 w-6',
      sm: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface ILoading extends VariantProps<typeof loadingVariants> {
  className?: string;
}

function LoadingEntity({ className, size }: ILoading) {
  return <Plane className={cn(loadingVariants({ size }), className)} />;
}

export const Loading = LoadingEntity;
