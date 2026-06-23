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
        <div className="w-fit">
          <Link href={'/'}>
            <LogoText color="gray" font="none" size='xxl' />
          </Link>
          <div className="flex flex-col gap-1 pt-3">
            <p>박찬우 포트폴리오</p>
            <div className="flex items-center gap-2">
              Github:
              <a
                className="text-primary underline"
                href="https://github.com/chanCo1/Mafilog"
                target="_blank"
              >
                Github로 이동
              </a>
            </div>
            <div className="flex items-center gap-2">
              Figma:
              <a
                className="text-primary underline"
                href="https://www.figma.com/design/RibAatqQvdD7BsXfOgzggs/Mafilog?node-id=0-1&p=f"
                target="_blank"
              >
                Figma로 이동
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
