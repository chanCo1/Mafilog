/**
 * @file: Textarea.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Textarea 컴포넌트
 */

import { useState, FocusEvent } from 'react';
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
        md: 'p-2.5',
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
  readonly?: boolean;
}

function TextareaEntity({
  className,
  variant,
  size,
  label,
  labelPosition = 'top',
  isRequired = false,
  description,
  errorMsg,
  readonly,
  ...props
}: ITextarea) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (props.disabled || props.readOnly) return;
    setIsFocused(true);

    if (props.onFocus) {
      props.onFocus(e);
    }
  };
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (props.disabled || props.readOnly) return;
    setIsFocused(false);

    if (props.onBlur) {
      props.onBlur(e);
    }
  };

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
            !readonly && isFocused && 'border-border-active border',
            className,
          )}
        >
          <textarea
            className={cn(
              'scrollbar-hide w-full resize-none outline-none focus:ring-0',
              readonly ? 'h-10' : 'h-20',
            )}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={readonly}
          />
        </div>
      </div>
      {description && (
        <span className="text-text-secondary text-sm font-bold">
          {description}
        </span>
      )}
      {errorMsg && (
        <span className="text-state-error text-sm font-bold">{errorMsg}</span>
      )}
    </div>
  );
}

export const Textarea = TextareaEntity;
