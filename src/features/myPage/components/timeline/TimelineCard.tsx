/**
 * @file: TimelineCard.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 마이페이지 > 타임라인 카드 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { Chip } from '@/shared/components/ui/Chip';
import { convertComma } from '@/shared/lib/utils';

interface ITimelineCard {
  className?: string;
  index: number;
  isSelected: boolean;
}

export default function TimelineCard({
  className,
  index = 1,
  isSelected,
}: ITimelineCard) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-center">
        <span>YYYY-MM-DD ~ YYYY-MM-DD (DD일)</span>
      </div>
      <Card select className="flex flex-col gap-3" isSelected={isSelected}>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-text-secondary font-bold">#{index}</span>
            <h3 className="text-lg font-bold">{'도쿄 먹방 여행'}</h3>
          </div>
          <div>도쿄</div>
          <div className="flex gap-1">
            <Chip size="sm" variant="gray">
              #{'연인과'}
            </Chip>
          </div>
        </div>
        <span className="font-bold">{convertComma(1560000)}원 지출</span>
      </Card>
    </div>
  );
}
