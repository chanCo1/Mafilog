/**
 * @file: Input.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: Input 컴포넌트
 */

'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import RequireDot from '@/shared/components/ui/RequireDot';

const inputVariants = cva(
  'flex items-center w-full transition-colors placeholder:text-text-caption disabled:opacity-50 disabled:bg-gray-2',
  {
    variants: {
      variant: {
        outline: 'border-1 border-border-secondary rounded-md',
        none: 'border-none',
      },
      size: {
        md: 'px-2.5 py-2',
        sm: 'px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  },
);

interface IInput
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'>,
    VariantProps<typeof inputVariants> {
  className?: string;
  inputClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
}

function InputEntity(
  {
    className,
    inputClassName,
    prefix,
    suffix,
    label,
    labelPosition = 'top',
    variant,
    size,
    isRequired = false,
    description,
    errorMsg,
    ...props
  }: IInput,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.disabled) return;

    setIsFocused(true);

    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.disabled) return;

    setIsFocused(false);

    if (props.onFocus) {
      props.onFocus(e);
    }
  }

  return (
    <div className="flex flex-col">
      <div
        className={cn('flex gap-1', labelPosition === 'top' ? 'flex-col' : '')}
      >
        {label && (
          <div className="flex min-w-25 items-center gap-1">
            <span>{label}</span>
            {isRequired && <RequireDot />}
          </div>
        )}
        <div
          className={cn(
            props.disabled && 'bg-gray-1',
            inputVariants({ variant, size }),
            isFocused && 'border-border-active border',
            className,
          )}
          ref={ref}
        >
          {prefix && <span className="mr-1">{prefix}</span>}
          <input
            className={cn('w-full outline-none focus:ring-0', inputClassName)}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {suffix && <span className="ml-1">{suffix}</span>}
        </div>
      </div>
      {description && (
        <span className="text-text-secondary text-sm">
          {description}
        </span>
      )}
      {errorMsg && (
        <span className="text-state-error text-sm font-bold">{errorMsg}</span>
      )}
    </div>
  );
}

export const Input = React.forwardRef(InputEntity);
