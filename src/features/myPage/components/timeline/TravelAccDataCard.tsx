/**
 * @file: TravelAccDataCard.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 여행 누적 정보 노출 카드 컴포넌트
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';

interface ITravelAccDataCard {
  children: ReactNode;
  name: string;
  className?: string;
}

function TravelAccDataCard({ name, children, className }: ITravelAccDataCard) {
  return (
    <Card className={cn('flex flex-col gap-3', className)}>
      <span className="font-bold">{name}</span>
      <div className="flex items-baseline justify-end text-sm">{children}</div>
    </Card>
  );
}

function TavelAccContent({
  count,
  unit,
  className,
}: {
  count: number;
  unit: string;
  className?: string;
}) {
  return (
    <>
      <span className={cn('text-primary text-xl font-bold', className)}>
        {count}
      </span>
      {unit}
    </>
  );
}

TravelAccDataCard.Content = TavelAccContent;

export default TravelAccDataCard;
