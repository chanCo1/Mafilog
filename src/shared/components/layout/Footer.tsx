/**
 * @file: Footer.tsx
 * @author: chad
 * @since: 2026.04.19 ~
 * @description: Footer 컴포넌트
 */

import { LogoText } from '@/shared/components/ui/LogoText';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { DEFAULT_LAYOUT_CLASSNAME } from '@/shared/constants';

export default function Footer() {
  return (
    <footer className="border-border-active min-h-40 border-t-4 bg-white">
      <div className={cn(DEFAULT_LAYOUT_CLASSNAME, 'h-full px-3 py-5')}>
        <Link href={'/'}>
          <LogoText color="gray" />
        </Link>
        <p>박찬우 포트폴리오</p>
      </div>
    </footer>
  );
}
