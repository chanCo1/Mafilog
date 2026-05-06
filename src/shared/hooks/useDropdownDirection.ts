/**
 * @file: useDropdownDirection.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: 화면 하단 여유 공간에 따라 위/아래 노출 훅
 */

import { useState, useLayoutEffect, RefObject } from 'react';

interface UseDropdownDirectionProps {
  isOpen: boolean;
  ref: RefObject<HTMLElement>;
  maxHeight?: number;
}

export const useDropdownDirection = ({
  isOpen,
  ref,
  maxHeight = 200,
}: UseDropdownDirectionProps) => {
  const [direction, setDirection] = useState<'down' | 'up'>('down');

  useLayoutEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 하단 여유 공간이 설정한 최대 높이보다 작으면 위로 띄움
      if (viewportHeight - rect.bottom < maxHeight) {
        setDirection('up');
      } else {
        setDirection('down');
      }
    }
  }, [isOpen, ref, maxHeight]);

  return direction;
};
