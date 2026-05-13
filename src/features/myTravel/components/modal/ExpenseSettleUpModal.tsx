/**
 * @file: ExpenseSettleUpModal.tsx
 * @author: chad
 * @since: 2026.05.13 ~
 * @description: 가계부 정산 모달
 */

import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import { convertComma } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { User } from 'lucide-react';

interface IExpenseSettleUpModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ExpenseSettleUpModal({
  isOpen,
  handleClose,
}: IExpenseSettleUpModal) {
  const { getAllTotalSpend } = useTravelExpenseStore();
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);

  return (
    <SideModal
      isOpen={isOpen}
      title="정산"
      handleClose={handleClose}
      footer={
        <Button variant="gray" onClick={handleClose}>
          닫기
        </Button>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-bold">여행 총 지출</p>
          <span className="text-state-error text-xxl font-bold">
            {convertComma(getAllTotalSpend())}원
          </span>
        </div>

        <div className="scrollbar-hide flex flex-col gap-3 overflow-auto">
          <div className="flex flex-col gap-2">
            <p className="font-bold">개인별 지출</p>
            <Card className="flex flex-col gap-2">
              {travelInfo.member.map((member) => (
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    <User size={20} className="text-primary" />
                    <span className="font-bold">{member.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-state-error text-lg font-bold">
                      {'NN'}원
                    </span>
                    <span className="text-text-secondary">결제: {'NN'}원</span>
                  </div>
                </div>
              ))}
            </Card>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">정산</p>
            <Card>asd</Card>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">내 지출 정리</p>
            <Card className="flex flex-col gap-2">
              <div className="flex items-baseline gap-1">
                <span>총 결제 금액:</span>
                <span className="text-state-error text-lg font-bold">{'NN'}원</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span>받을 금액:</span>
                <span className="text-state-success text-lg font-bold">{'NN'}원</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span>내 순수 지출:</span>
                <span className="text-state-error text-lg font-bold">{'NN'}원</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SideModal>
  );
}
