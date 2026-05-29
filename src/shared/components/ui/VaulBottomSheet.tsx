/**
 * @file: VaulBottomSheet.tsx
 * @author: chad
 * @since: 2026.05.29 ~
 * @description: 모바일에서 사용할 바텀시트 컴포넌트
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { Drawer } from 'vaul';

interface IVaulBottomSheet {
  children: ReactNode;
  className?: string;
  title?: string;
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function VaulBottomSheet({
  title,
  children,
  isOpen,
  onOpenChange,
  className,
}: IVaulBottomSheet) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed right-0 bottom-0 left-0 z-30 mt-24 flex max-h-70 flex-col rounded-t-2xl bg-white outline-none"
        >
          <div
            className={cn(
              'scrollbar-hide mx-auto flex w-full max-w-md flex-col overflow-auto p-4',
              className,
            )}
          >
            {!title && (
              <Drawer.Title className="px-1 pb-2 font-bold">
                {title}
              </Drawer.Title>
            )}
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
