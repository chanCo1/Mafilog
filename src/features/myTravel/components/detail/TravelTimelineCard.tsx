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
import { ChevronsUpDown } from 'lucide-react';

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
  isLoading?: boolean;
  dragListeners?: Record<string, any>;
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
  isLoading,
  dragListeners,
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
          <div className="flex items-center gap-2">
            <div
              className="cursor-grab touch-none active:cursor-grabbing"
              {...dragListeners}
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronsUpDown className="text-text-secondary h-5 w-5" />
            </div>
            {children}
          </div>
          <Button
            variant="redOutline"
            size="xs"
            onClick={onClickDelete}
            isLoading={isLoading}
          >
            삭제
          </Button>
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
