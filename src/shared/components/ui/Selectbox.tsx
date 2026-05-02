/**
 * @file: Selectbox.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Selectbox 컴포넌트
 */

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import { ChevronDown } from 'lucide-react';
import { ILabelValue } from '@/shared/interfaces';

interface ISelectbox extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix' | 'size' | 'value' | 'onChange'
> {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
  options: ILabelValue[];
  prefix?: React.ReactNode;
  size?: 'md' | 'sm';
  variant?: 'outline' | 'none';
  value: ILabelValue | undefined;
  addValueText?: string;
  onChange: (value: ILabelValue) => void;
}

function SelectboxEntity(
  {
    className,
    label,
    labelPosition = 'top',
    isRequired,
    description,
    errorMsg,
    options,
    prefix,
    size = 'md',
    variant = 'outline',
    value,
    onChange,
    addValueText,
    ...props
  }: ISelectbox,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleFocus = () => {
    // handleBlur();
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const onClickOption = (option: ILabelValue) => {
    if (props.disabled) return;

    if (onChange) onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)} ref={ref}>
      <Input
        label={label}
        labelPosition={labelPosition}
        placeholder={props.placeholder}
        prefix={prefix}
        suffix={<ChevronDown className="h-4 w-4" />}
        isRequired={isRequired}
        description={description}
        errorMsg={errorMsg}
        readOnly
        inputClassName="cursor-pointer"
        value={
          value?.label ? `${value?.label ?? ''} ${addValueText ?? ''}` : ''
        }
        variant={variant}
        size={size}
        onBlur={handleBlur}
        onClick={handleFocus}
        {...props}
      />

      {/* 셀렉트박스 */}
      {isOpen && (
        <div
          className={cn(
            'scrollbar-hide absolute z-50 flex max-h-50 w-full flex-col gap-1 overflow-auto rounded-lg bg-white p-2 shadow-md',
            label ? 'top-16' : 'top-10',
          )}
        >
          {options.map((option) => (
            <span
              key={option.value}
              className={cn(
                'hover:bg-gray-1 cursor-pointer rounded-md p-1.5',
                option.value === value?.value
                  ? 'text-text-primary'
                  : 'text-text-secondary',
              )}
              onMouseDown={() => {
                onClickOption(option);
              }}
            >
              {option.label} {addValueText ?? ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export const Selectbox = React.forwardRef(SelectboxEntity);
