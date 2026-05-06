/**
 * @file: Selectbox.tsx
 * @author: chad
 * @since: 2026.04.20 ~
 * @description: Selectbox 컴포넌트
 */

import {
  useState,
  ReactNode,
  useLayoutEffect,
  InputHTMLAttributes,
} from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import { ChevronDown } from 'lucide-react';
import { ILabelValue } from '@/shared/interfaces';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useDropdownDirection } from '@/shared/hooks/useDropdownDirection';

interface ISelectbox extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'prefix' | 'size' | 'value' | 'onChange'
> {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
  options: ILabelValue[];
  prefix?: ReactNode;
  size?: 'md' | 'sm';
  variant?: 'outline' | 'none';
  value: ILabelValue | undefined;
  addValueText?: string;
  onChange: (value: ILabelValue) => void;
}

export default function Selectbox({
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
}: ISelectbox) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  const direction = useDropdownDirection({ isOpen, ref: dropdownRef });

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
    <div className={cn('relative', className)} ref={dropdownRef}>
      <Input
        label={label}
        labelPosition={labelPosition}
        placeholder={props.placeholder}
        prefix={prefix}
        suffix={
          <ChevronDown className={cn('h-4 w-4 stroke-3 transition duration-200', isOpen ? 'rotate-180' : '')} />
        }
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
      {isOpen && options && (
        <ul
          className={cn(
            'scrollbar-hide absolute z-50 flex max-h-50 w-full flex-col gap-1 overflow-auto rounded-lg bg-white p-2 shadow-lg',
            direction === 'down' ? 'top-full mt-1' : 'bottom-full mb-1',
          )}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(
                'hover:bg-gray-1 cursor-pointer rounded-md p-1.5',
                option.value === value?.value
                  ? 'text-text-primary font-bold'
                  : 'text-text-secondary',
              )}
              onMouseDown={() => {
                onClickOption(option);
              }}
            >
              {option.label} {addValueText ?? ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
