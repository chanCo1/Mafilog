/**
 * @file: TravelExpensesTimeline.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelExpensesTimeline 컴포넌트, 가계부 지출 리스트 카드
 */

import { MouseEvent, useMemo } from 'react';
import { convertComma, convertPaymentType } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { IExpenseList } from '@/shared/interfaces/travelExpenseStore.interface';
import TravelTimelineCard from '@/features/myTravel/components/detail/TravelTimelineCard';
import { EXPENSES_SPENDER_TYPE } from '@/shared/types/expenseEnum';

interface ITravelExpensesTimeline {
  timeLineData?: IExpenseList;
  dailyAllSchedule?: IExpenseList[];
  currentIndex?: number;
  day?: number;
  selectMode?: boolean;
}

export default function TravelExpensesTimeline({
  timeLineData,
  dailyAllSchedule,
  currentIndex,
  day,
  selectMode,
}: ITravelExpensesTimeline) {
  /** 일정 삭제 핸들러 */
  const handleDeleteSchedule = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('삭제!!!');
  };

  /** 지출자 가져오기 */
  const getSpender = useMemo(() => {
    const type = timeLineData?.spenderType;
    const spender = timeLineData?.spender || [];

    if (!type || spender.length === 0) return '';

    switch (type) {
      case EXPENSES_SPENDER_TYPE.SELF:
        return spender[0]?.label || '';
      case EXPENSES_SPENDER_TYPE.SPLIT:
        return '1/N';
      case EXPENSES_SPENDER_TYPE.ASSIGN:
        return spender.map((_spender) => _spender.label).join(', ');
      default:
        return '';
    }
  }, [timeLineData?.spenderType, timeLineData?.spender]);

  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center justify-center pb-2.5">
        <div className="shrink-0">
          <CategoryIcon
            variant={timeLineData?.category ? timeLineData?.category : 'plus'}
          />
        </div>
      </div>
      <div className="w-full pb-2.5">
        {timeLineData ? (
          <TravelTimelineCard
            time={timeLineData.time!}
            memo={timeLineData.memo!}
            // onClickCard={onClickCard}
            onClickDelete={(e) => handleDeleteSchedule(e)}
            selectMode={selectMode!}
            // isSelected={isSelected}
          >
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-bold">
                  {timeLineData.exchangeRate.currencyCode}
                </span>
                <span className="text-state-error text-lg font-bold">
                  {convertComma(timeLineData.amount ?? 0)}
                </span>
                <span className="text-text-secondary text-sm font-bold">
                  ({convertComma(timeLineData.calcExchangeAmount ?? 0)}원)
                </span>
              </div>
              <p className="font-bold">{timeLineData.name}</p>
              <div className="text-text-secondary text-sm">
                <span className="font-bold">결제: </span>
                <span>
                  {timeLineData.payer.label} ·{' '}
                  {convertPaymentType(timeLineData.paymentType)}
                </span>
                {getSpender && (
                  <>
                    <span> / </span>
                    <span className="font-bold">지출: </span>
                    <span>{getSpender}</span>
                  </>
                )}
              </div>
            </div>
          </TravelTimelineCard>
        ) : (
          <Card
            variant="dashed"
            className="flex flex-col items-start justify-center"
            disabled
          >
            <div className="text-text-primary w-full text-center text-sm">
              지출 내역이 없습니다.
              <br />
              사용한 금액을 입력하고 여행 경비를 관리해보세요!
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
