/**
 * @file: Textarea.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Textarea 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import RequireDot from '@/shared/components/ui/RequireDot';

const textareaVariants = cva(
  'flex items-center w-full transition-colors placeholder:text-text-caption disabled:opacity-50 disabled:bg-gray-2',
  {
    variants: {
      variant: {
        default: 'border-1 border-border-secondary rounded-md',
        none: 'border-none',
      },
      size: {
        md: 'px-2.5 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface ITextarea
  extends
    Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
}

function TextareaEntity(
  {
    className,
    variant,
    size,
    label,
    labelPosition = 'top',
    isRequired = false,
    description,
    errorMsg,
    ...props
  }: ITextarea,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="flex flex-col bg-white">
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
            textareaVariants({ variant, size }),
            isFocused && 'border-border-active border',
            className,
          )}
          ref={ref}
        >
          <textarea
            className="w-full outline-none focus:ring-0 h-20 resize-none"
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
      {description && (
        <span className="text-text-secondary text-sm font-bold">{description}</span>
      )}
      {errorMsg && (
        <span className="text-state-error text-sm font-bold">{errorMsg}</span>
      )}
    </div>
  );
}

export const Textarea = React.forwardRef(TextareaEntity);
