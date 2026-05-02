/**
 * @file: TravelTimelineCard.tsx
 * @author: chad
 * @since: 2026.05.02 ~
 * @description: TravelTimelineCard 컴포넌트, 일정 및 가계부 리스트 카드
 */

import { ReactNode, MouseEvent } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { GripVertical } from 'lucide-react';

interface ITravelTimelineCard {
  children: ReactNode;
  time: string;
  memo: string;
  onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickCard: () => void;
  className?: string;
  isMemo?: boolean;
  selectMode: boolean;
  isSelected: boolean;
}

export default function TravelTimelineCard({
  children,
  time,
  memo,
  onClickDelete,
  onClickCard,
  className,
  selectMode,
  isMemo,
  isSelected,
}: ITravelTimelineCard) {
  return (
    <div className={cn('felx flex-col', className)}>
      {time ? <span className="text-sm font-bold">{time}</span> : null}
      <Card
        className="cursor-pointer"
        onClick={onClickCard}
        select={selectMode}
        isSelected={isSelected}
      >
        <div className="flex items-center justify-between gap-2">
          {children}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="redOutline"
              size="xs"
              onClick={onClickDelete}
            >
              삭제
            </Button>
            <GripVertical className="h-5 w-5" />
          </div>
        </div>
      </Card>
      {!isMemo && memo ? (
        <div className="flex justify-end">
          <span className="text-text-secondary text-sm">{memo}</span>
        </div>
      ) : null}
    </div>
  );
}
