/**
 * @file: ReturnButton.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: ReturnButton 컴포넌트, 뒤로가기, 모달 닫기 등에 사용
 */

'use client';

import { forwardRef, useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

const returnButtonVariants = cva('flex items-center gap-1', {
  variants: {
    size: {
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface IReturnButton extends VariantProps<typeof returnButtonVariants> {
  className?: string;
  path?: string;
  label?: string;
  position?: 'left' | 'right';
  onClick?: () => void;
}

function ReturnButtonEntity({
  className,
  label,
  path,
  size,
  onClick,
  position = 'right',
}: IReturnButton) {
  const router = useRouter();

  const handleClick = () => {
    // 클릭 이벤트 일 경우
    if (onClick) {
      onClick();
      return;
    }

    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  /** 사이즈에 따른 아이콘 크기 */
  const getIconSize = useMemo(
    () => (size: VariantProps<typeof returnButtonVariants>['size']) => {
      switch (size) {
        case 'sm':
          return 'h-4 w-4';
        case 'md':
          return 'h-5 w-5';
        case 'lg':
          return 'h-6 w-6';
        default:
          return 'h-5 w-5';
      }
    },
    [],
  );

  const isRightPosition = position === 'right';

  return (
    <Button
      variant="none"
      size={size}
      onClick={handleClick}
      className={cn('p-0')}
    >
      <div className={cn(returnButtonVariants({ size }), className)}>
        {!isRightPosition && <ChevronLeft className={cn(getIconSize(size))} />}
        {label && <span>{label}</span>}
        {isRightPosition && <ChevronRight className={cn(getIconSize(size))} />}
      </div>
    </Button>
  );
}

export const ReturnButton = forwardRef(ReturnButtonEntity);
