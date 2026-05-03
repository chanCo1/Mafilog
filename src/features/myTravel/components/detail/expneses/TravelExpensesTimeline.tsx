/**
 * @file: TravelExpensesTimeline.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesTimeline 컴포넌트, 가계부 지출 리스트 카드
 */

import { useState, MouseEvent } from 'react';
import { cn } from '@/shared/lib/utils';
import { ICON_TYPE } from '@/shared/types/Enum';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { Button } from '@/shared/components/ui/Button';

interface ITravelExpensesTimeline {
  type?: ICON_TYPE;
  isSelect?: boolean;
}

export default function TravelExpensesTimeline({
  isSelect,
  type,
}: ITravelExpensesTimeline) {
  /** 일정 삭제 핸들러 */
  const handleDeleteSchedule = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('삭제!!!');
  };

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center justify-center pb-2.5">
        <div className="shrink-0">
          <CategoryIcon variant={type ? type : 'plus'} />
        </div>
      </div>
      <div className="w-full pb-2.5">
        {type ? (
          <div>
            <span className="text-sm font-bold">HH:mm</span>
            <Card>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">아사쿠사 규카츠</span>
                  <span className="text-text-secondary text-sm">
                    아사쿠사아~~
                  </span>
                </div>
                <Button
                  variant="redOutline"
                  size="xs"
                  onClick={(e) => handleDeleteSchedule(e)}
                >
                  삭제
                </Button>
              </div>
            </Card>
            <div className="flex justify-end">
              <span className="text-text-secondary text-sm">메모~</span>
            </div>
          </div>
        ) : (
          <Card
            variant="dashed"
            className="flex flex-col items-start justify-center"
            disabled
          >
            <div className="text-text-primary w-full text-center text-sm">
              지출 내역이 없습니다.<br />
              사용한 금액을 입력하고 여행 경비를 관리해보세요!
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
