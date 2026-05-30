/**
 * @file: Button.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: Button 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
// import { Loader2 } from 'lucide-react';
import { Loading } from '@/shared/components/ui/Loading';

const buttonVariants = cva(
  'flex gap-1 cursor-pointer font-bold rounded-md items-center justify-center disabled:pointer-events-none disabled:opacity-50 hover:opacity-90 text-white w-fit shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        gray: 'bg-gray-2 text-text-primary',
        ghost: 'hover:bg-gray-1 text-text-primary',
        primaryOutline: 'bg-white ring ring-inset ring-priamry text-primary',
        redOutline:
          'bg-white ring ring-inset ring-state-error text-state-error',
        none: 'bg-transparent text-text-primary',
      },
      size: {
        lg: 'px-4 py-3 text-md',
        md: 'px-4 py-2.5 text-md',
        sm: 'px-3 py-2 text-sm',
        xs: 'px-2.5 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface IButton
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isLoading?: boolean;
}

function ButtonEntity({
  className,
  prefix,
  suffix,
  isLoading = false,
  size,
  variant,
  type = 'button',
  ...props
}: IButton) {
  const isDisabled = isLoading || props.disabled;

  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      {...props}
    >
      {/* 로딩 상태일 경우 노출 */}
      {isLoading && <Loading className="h-4 w-4" />}
      {/* prefix가 있고 로딩 상태가 아닐 때 노출 */}
      {prefix && !isLoading && (
        <span className="flex items-center">{prefix}</span>
      )}
      {/* 버튼안에 내용 노출 */}
      {props.children && <>{props.children}</>}
      {/* suffix 있고 로딩 상태가 아닐 때 노출 */}
      {suffix && !isLoading && (
        <span className="flex items-center">{suffix}</span>
      )}
    </button>
  );
}

export const Button = ButtonEntity;
