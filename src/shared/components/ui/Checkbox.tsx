/**
 * @file: Checkbox.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Checkbox 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ILabelValue } from '@/shared/interfaces';
import RequireDot from '@/shared/components/ui/RequireDot';
import {
  Square,
  SquareSquare,
  SquareCheck,
  SquareCheckBig,
  User,
  UserCheck,
} from 'lucide-react';

const checkboxVariants = cva('flex gap-1 cursor-pointer items-center w-fit', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      red: 'text-state-error',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

interface ICheckbox
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'onChange'>,
    VariantProps<typeof checkboxVariants> {
  className?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  isRequired?: boolean;
  checkOptions: ILabelValue[];
  disabled?: boolean;
  description?: string;
  errorMsg?: string;
  direction?: 'vertical' | 'horizontal';
  value: ILabelValue[];
  onChange: (value: ILabelValue[]) => void;
  isUserIcon?: boolean;
}

function CheckboxEntity(
  {
    className,
    label,
    labelPosition = 'top',
    color,
    isRequired,
    checkOptions,
    disabled,
    description,
    errorMsg,
    direction = 'horizontal',
    value,
    onChange,
    isUserIcon,
    ...props
  }: ICheckbox,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  /** 라디오 클릭 */
  const onClickRadio = (checkedOption: ILabelValue) => {
    if (disabled) return;

    const isChecked = value.some((v) => v.value === checkedOption.value);

    if (isChecked) {
      onChange(value.filter((v) => v.value !== checkedOption.value));
    } else {
      onChange([...value, checkedOption]);
    }
  };

  return (
    <div
      className={cn(
        'flex gap-1',
        labelPosition === 'top' ? 'flex-col' : '',
        disabled && 'opacity-50',
      )}
    >
      {/* 라벨 */}
      {label && (
        <div className={cn('flex min-w-25 items-center gap-1')}>
          <span>{label}</span>
          {isRequired && <RequireDot />}
        </div>
      )}
      <div
        className={cn(
          'flex gap-1.5',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
        )}
      >
        {checkOptions.map((option) => {
          const isChecked = value?.some((v) => v.value === option.value);

          return (
            <div
              key={option.value}
              ref={ref}
              className={cn(
                checkboxVariants({ color }),
                disabled && 'cursor-default',
                className,
              )}
              onClick={() => onClickRadio(option)}
              {...props}
            >
              {isChecked ? (
                <>
                  {isUserIcon ? (
                    <UserCheck className="h-5 w-5" />
                  ) : (
                    <SquareCheckBig className="h-5 w-5" />
                  )}
                </>
              ) : (
                <>
                  {isUserIcon ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </>
              )}
              <span className="text-text-primary">{option.label}</span>
            </div>
          );
        })}
      </div>

      {/* 설명 */}
      {description && (
        <span className="text-text-secondary text-sm font-bold">
          {description}
        </span>
      )}

      {/* 에러 메시지 */}
      {errorMsg && (
        <span className="text-state-error text-sm font-bold">{errorMsg}</span>
      )}
    </div>
  );
}

export const Checkbox = React.forwardRef(CheckboxEntity);
