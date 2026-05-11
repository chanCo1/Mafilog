/**
 * @file: ExpenseStatisticModal.tsx
 * @author: chad
 * @since: 2026.05.11 ~
 * @description: ExpenseStatisticModal 컴포넌트
 */

import { useState } from 'react';
import { Chip } from '@/shared/components/ui/Chip';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { convertComma } from '@/shared/lib/utils';
import { Toggle } from '@/shared/components/ui/Toggle';
import { EXPENSE_STATISTIC_LIST } from '@/features/myTravel/constants/expense.constant';
import { STATISTIC_TAB } from '@/shared/types/expenseEnum';
import CategoryStatistic from '@/features/myTravel/components/modal/statistic/CategoryStatistic';
import ScheduleStatistic from '@/features/myTravel/components/modal/statistic/ScheduleStatistic';

interface IExpenseStatisticModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ExpenseStatisticModal({
  isOpen,
  handleClose,
}: IExpenseStatisticModal) {
  const [isShowMySpend, setIsMySpend] = useState(false);
  const [selectedStatistic, setSelectedStatistic] = useState(
    EXPENSE_STATISTIC_LIST[0],
  );

  const { getAllTotalSpend } = useTravelExpenseStore();

  return (
    <SideModal
      isOpen={isOpen}
      title="통계"
      handleClose={handleClose}
      footer={
        <Button variant="gray" onClick={handleClose}>
          닫기
        </Button>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <p className="font-bold">여행 총 지출</p>
            <span className="text-state-error text-xxl font-bold">
              {convertComma(getAllTotalSpend())}원
            </span>
          </div>
          <Toggle
            label="내 지출 보기"
            isOn={isShowMySpend}
            onToggle={() => setIsMySpend(!isShowMySpend)}
          />
        </div>

        <div className="flex gap-1">
          {EXPENSE_STATISTIC_LIST.map((list, index) => (
            <Chip
              key={`${list.value}-${index}`}
              variant={
                selectedStatistic.value === list.value
                  ? 'primary'
                  : 'primaryOutline'
              }
              onClick={() => setSelectedStatistic(list)}
            >
              {list.label}
            </Chip>
          ))}
        </div>

        <div className="scrollbar-hide overflow-auto">
          {selectedStatistic.value === STATISTIC_TAB.SCHEDULE ? (
            <ScheduleStatistic isShowMySpend={isShowMySpend} />
          ) : (
            <CategoryStatistic />
          )}
        </div>
      </div>
    </SideModal>
  );
}
