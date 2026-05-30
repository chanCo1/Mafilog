/**
 * @file: Skeleton.tsx
 * @author: chad
 * @since: 2026.05.30 ~
 * @description: 스켈레톤 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const skeletonVariants = cva('animate-pulse bg-gray-2', {
  variants: {
    shape: {
      rectangle: 'rounded-md',
      circle: 'rounded-full',
    },
    size: {
      sm: 'h-6',
      md: 'h-10',
      lg: 'h-16',
      xl: 'h-22',
      xxl: 'h-30',
      xxxl: 'h-40',
    },
  },
  defaultVariants: {
    shape: 'rectangle',
    size: 'sm',
  },
});

interface ISkeleton
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function SkeletonEntity({ className, shape, size, ...props }: ISkeleton) {
  return <div className={cn(skeletonVariants({ shape, size }), className)} />;
}

export const Skeleton = SkeletonEntity;
