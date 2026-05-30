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
import { Square, SquareCheckBig, User } from 'lucide-react';

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
  checkOptions?: ILabelValue[];
  disabled?: boolean;
  description?: string;
  errorMsg?: string;
  direction?: 'vertical' | 'horizontal';
  value: ILabelValue[] | boolean;
  onChange: (value: ILabelValue[] | boolean) => void;
  isUserIcon?: boolean;
  checkboxLabel?: string;
  isCheckList?: boolean;
}

function CheckboxEntity(
  {
    className,
    label,
    checkboxLabel,
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
    isCheckList = false,
    ...props
  }: ICheckbox
) {
  /** 체크박스 클릭 */
  const onClickMultipleCheckbox = (_checkedOption: ILabelValue) => {
    if (disabled) return;
    const _checkValue = value as ILabelValue[];

    const isChecked = _checkValue.some((v) => v.value === _checkedOption.value);

    if (isChecked) {
      onChange(_checkValue.filter((v) => v.value !== _checkedOption.value));
    } else {
      onChange([..._checkValue, _checkedOption]);
    }
  };

  /** 단일 체크박스 클릭 */
  const onClickSingleCheckbox = (value: boolean) => {
    if (disabled) return;
    onChange(value);
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
        {checkOptions?.length &&
          checkOptions.map((option) => {
            const isChecked = (value as ILabelValue[])?.some(
              (v) => v.value === option.value,
            );

            return (
              <SingleCheckbox
                key={option.value}
                className={cn(
                  checkboxVariants({ color }),
                  disabled && 'cursor-default',
                  className,
                )}
                value={value as boolean}
                isChecked={isChecked}
                isUserIcon={isUserIcon}
                label={option.label}
                onClick={() => onClickMultipleCheckbox(option)}
                isCheckList={isCheckList}
                {...props}
              />
            );
          })}
        {!checkOptions?.length && (
          <SingleCheckbox
            className={cn(
              checkboxVariants({ color }),
              disabled && 'cursor-default',
              className,
            )}
            value={value as boolean}
            isChecked={value as boolean}
            isUserIcon={isUserIcon}
            label={checkboxLabel}
            onClick={() => onClickSingleCheckbox(!value)}
            isCheckList={isCheckList}
            {...props}
          />
        )}
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

export const Checkbox = CheckboxEntity;

/** 싱글 체크박스 컴포넌트 */
interface ISingleCheckbox extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  disabled?: boolean;
  // onChange?: () => void;
  isUserIcon?: boolean;
  isChecked?: boolean;
  isCheckList?: boolean;
  label?: string;
  value: boolean;
}
const SingleCheckbox = ({
  className,
  disabled,
  isUserIcon,
  isChecked,
  isCheckList = false,
  label,
  value,
  ...props
}: ISingleCheckbox) => {
  return (
    <div className={className} {...props}>
      {isChecked ? (
        <>
          {isUserIcon ? (
            <User className="h-5 w-5 fill-current" />
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
      {label && (
        <span
          className={cn(
            value && isCheckList
              ? 'text-text-secondary line-through'
              : 'text-text-primary',
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};
