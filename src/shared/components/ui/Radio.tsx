/**
 * @file: Radio.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Radio 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ILabelValue } from '@/shared/interfaces';
import RequireDot from '@/shared/components/ui/RequireDot';
import { Circle, CircleCheck } from 'lucide-react';

const radioVariants = cva('flex gap-1 cursor-pointer items-center w-fit', {
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

interface IRadio
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'onChange'>,
    VariantProps<typeof radioVariants> {
  className?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  isRequired?: boolean;
  radioOptions: ILabelValue[];
  disabled?: boolean;
  description?: string;
  errorMsg?: string;
  direction?: 'vertical' | 'horizontal';
  value: ILabelValue;
  onChange: (value: ILabelValue) => void;
}

function RadioEntity(
  {
    className,
    label,
    labelPosition = 'top',
    color,
    isRequired,
    radioOptions,
    disabled,
    description,
    errorMsg,
    direction = 'horizontal',
    value,
    onChange,
    ...props
  }: IRadio,
  ref: React.ForwardedRef<HTMLInputElement>,
) {

  /** 라디오 클릭 */
  const onClickRadio = (value: ILabelValue) => {
    if (disabled) return;

    if (onChange) onChange(value)
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
      <div className={cn('flex gap-1.5', direction === 'horizontal' ? 'flex-row' :'flex-col')}>
        {radioOptions.map((option) => (
          <div
            key={option.value}
            ref={ref}
            className={cn(
              radioVariants({ color }),
              disabled && 'cursor-default',
              className,
            )}
            onClick={() => onClickRadio(option)}
            {...props}
          >
            {value?.value === option.value ? <CircleCheck /> : <Circle />}
            <span className="text-text-primary">{option.label}</span>
          </div>
        ))}
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

export const Radio = React.forwardRef(RadioEntity);
