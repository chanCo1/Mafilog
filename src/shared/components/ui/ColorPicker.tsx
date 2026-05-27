/**
 * @file: ColorPicker.tsx
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 색상 선택 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { HexColorPicker } from 'react-colorful';
import RequireDot from '@/shared/components/ui/RequireDot';

interface IColorPicker {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({
  onChange,
  value,
  className,
  label,
  labelPosition = 'top',
  isRequired = false,
}: IColorPicker) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div
        className={cn('flex gap-1', labelPosition === 'top' ? 'flex-col' : '')}
      >
        {label && (
          <div className="flex min-w-25 items-center gap-1">
            <span>{label}</span>
            {isRequired && <RequireDot />}
          </div>
        )}
        <HexColorPicker
          color={value}
          onChange={onChange}
          style={{
            width: '100%',
            height: '150px',
          }}
        />
      </div>
    </div>
  );
}
