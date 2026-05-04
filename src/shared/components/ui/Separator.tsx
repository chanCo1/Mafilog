/**
 * @file: Separator.tsx
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: Separator 컴포넌트, 구분선
 */

import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const separatorVariants = cva('shrink-0 bg-gray-100 rounded-full', {
  variants: {
    position: {
      horizontal: 'h-0.5 w-full w-4/5',
      vertical: 'h-auto self-stretch w-0.5',
    },
  },
  defaultVariants: {
    position: 'vertical',
  },
});

interface ISeparator
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  className?: string;
}

export default function Separator({ className, position, ...props }: ISeparator) {
  return (
    <div className='flex items-center justify-center'>
      <div
        className={cn(separatorVariants({ position, className }))}
        {...props}
      />
    </div>
  );
}

// export const Separator = forwardRef(SeparatorEntity);
