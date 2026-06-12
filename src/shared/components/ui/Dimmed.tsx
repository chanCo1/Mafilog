/**
 * @file: Dimmed.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: Dimmed 컴포넌트, 어두운 투명색으로 오버레이
 */

import { cn } from '@/shared/lib/utils';

interface IDimmed extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  // children?: React.ReactNode;
}

export default function Dimmed({ className, ...props }: IDimmed) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-15 bg-[rgba(0,0,0,0.5)] transition-opacity duration-300 ease',
        className,
      )}
      {...props}
    />
  );
}