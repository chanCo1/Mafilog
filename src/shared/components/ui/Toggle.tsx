/**
 * @file: Toggle.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: 토글 컴포넌트
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const toggleVariants = cva(
  'relative h-6 w-11 rounded-full transition-colors duration-200 ease-in-out',
  {
    variants: {
      size: {
        lg: '',
        md: '',
        sm: '',
      },
      color: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        red: 'bg-state-error',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  },
);

interface IToggle
  extends
    Omit<HTMLAttributes<HTMLInputElement>, 'color' | 'onChange'>,
    VariantProps<typeof toggleVariants> {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  labelPosition?: 'top' | 'left' | 'right';
  disabled?: boolean;
  description?: string;
  className?: string;
}

function ToggleEntity({
  isOn,
  onToggle,
  label,
  labelPosition = 'left',
  disabled,
  // description,
  className,
  color,
  size,
}: IToggle) {
  return (
    <label>
      <input
        type="checkbox"
        className="hidden"
        checked={isOn}
        onChange={onToggle}
        disabled={disabled}
      />

      <div
        className={cn(
          'flex',
          labelPosition === 'top'
            ? 'flex-col'
            : labelPosition === 'left'
              ? 'items-center gap-1'
              : 'items-center gap-1 flex-row-reverse',
        )}
      >
        {label && <span>{label}</span>}
        <div
          className={cn(
            toggleVariants({ color, size }),
            isOn ? 'bg-primary' : 'bg-gray-3',
            disabled ? '' : 'cursor-pointer',
            className,
          )}
        >
          <div
            className={cn(
              'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ease-in-out',
              isOn ? 'translate-x-5' : 'translate-x-0',
            )}
          />
        </div>
      </div>
    </label>
  );
}

export const Toggle = ToggleEntity;
