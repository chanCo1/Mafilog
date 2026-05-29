/**
 * @file: useOutsideClick.ts
 * @author: chad
 * @since: 2026.05.03 ~
 * @description: 외부 클릭 시 모달 닫히는 커스텀 훅
 */

import { useEffect, useRef } from 'react';

export const useOutsideClick = (handelClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Element;

      // vaul 바텀 시트에서는 무시
      if (target.closest('[data-vaul-drawer]')) {
        return;
      }

      // 클릭된 엘리먼트가 ref(드롭다운 부모) 내부에 포함되지 않았다면 콜백 실행
      if (ref.current && !ref.current.contains(target as Node)) {
        handelClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [handelClose]);

  return ref;
};
