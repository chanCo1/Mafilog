/**
 * @file: TimePicker.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: TimePicker 컴포넌트, 시간 선택
 */

import {
  useState,
  ReactNode,
  useLayoutEffect,
  InputHTMLAttributes,
  useRef,
  useEffect,
} from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import { ChevronDown } from 'lucide-react';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useDropdownDirection } from '@/shared/hooks/useDropdownDirection';

interface ITimePicker extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'prefix' | 'size' | 'value' | 'onChange'
> {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
  prefix?: ReactNode;
  size?: 'md' | 'sm';
  variant?: 'outline' | 'none';
  value: string;
  addValueText?: string;
  onChange: (value: string) => void;
}

export default function TimePicker({
  className,
  label,
  labelPosition = 'top',
  isRequired,
  description,
  errorMsg,
  prefix,
  size = 'md',
  variant = 'outline',
  value,
  onChange,
  addValueText,
  ...props
}: ITimePicker) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));
  
  const hourRef = useRef<HTMLUListElement>(null);
  const minuteRef = useRef<HTMLUListElement>(null);
  
  const direction = useDropdownDirection({ isOpen, ref: dropdownRef });

  const HOURS = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const MINUTES = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, '0'),
  );

  const [selectedHour, setSeletedHour] = useState('');
  const [selectedMinute, setSeletedMinute] = useState('');

  /** 분을 클릭하면 자동 선택 후 닫힘 */
  const handelMinuteClick = (minute: string) => {
    if (props.disabled || !selectedHour) return;

    setSeletedMinute(minute);

    if (onChange) onChange(`${selectedHour}:${minute}`);
    setIsOpen(false);
  };

  const handleFocus = () => {
    // handleBlur();
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    if (isOpen) {
      // 초기값
      if (value && value.includes(':')) {
        const [hour, minute] = value.split(':');
        setSeletedHour(hour);
        setSeletedMinute(minute);
      } else {
        setSeletedHour('');
        setSeletedMinute('');
      }
    }
  }, [isOpen, value]);

  useEffect(() => {
    if (!isOpen || !selectedHour || !selectedMinute) return;

    const scrollTimer = requestAnimationFrame(() => {
      if (hourRef.current && minuteRef.current) {
        const hourItem = hourRef.current.querySelector('.is-selected');
        const minuteItem = minuteRef.current.querySelector('.is-selected');

        if (hourItem && minuteItem) {
          hourItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          minuteItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    return () => cancelAnimationFrame(scrollTimer);
  }, [isOpen]);

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
        value={value}
        variant={variant}
        size={size}
        onBlur={handleBlur}
        onClick={handleFocus}
        {...props}
      />

      {/* 시간 드롭다운 */}
      {isOpen && (
        <div
          className={cn(
            'scrollbar-hide absolute z-50 flex max-h-50 w-full gap-1 overflow-auto rounded-lg bg-white p-2 shadow-lg',
            direction === 'down' ? 'top-full mt-1' : 'bottom-full mb-1',
          )}
        >
          <ul ref={hourRef} className="scrollbar-hide flex-1 overflow-y-auto">
            {HOURS.map((_hour) => (
              <li
                key={_hour}
                className={cn(
                  'flex cursor-pointer items-center justify-center rounded-lg p-1',
                  selectedHour === _hour
                    ? 'text-text-primary is-selected font-bold'
                    : 'text-text-secondary hover:bg-gray-1',
                )}
                onClick={() => setSeletedHour(_hour)}
              >
                {_hour}시
              </li>
            ))}
          </ul>
          <span className="text-text-secondary flex items-center">:</span>
          <ul ref={minuteRef} className="scrollbar-hide flex-1 overflow-y-auto">
            {MINUTES.map((_minute) => (
              <li
                key={_minute}
                className={cn(
                  'flex cursor-pointer items-center justify-center rounded-lg p-1',
                  selectedMinute === _minute
                    ? 'text-text-primary is-selected font-bold'
                    : 'text-text-secondary hover:bg-gray-1',
                )}
                onClick={() => handelMinuteClick(_minute)}
              >
                {_minute}분
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
