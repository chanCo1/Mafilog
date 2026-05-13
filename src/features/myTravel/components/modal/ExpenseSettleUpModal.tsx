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
import { User, MoveRight, Dot } from 'lucide-react';

interface IExpenseSettleUpModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ExpenseSettleUpModal({
  isOpen,
  handleClose,
}: IExpenseSettleUpModal) {
  const {
    getAllTotalSpend,
    getTotalPaymentAmountByMember,
    getTotalSpendAmountByMember,
    getFinalSettlement,
  } = useTravelExpenseStore();
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);

  const getMemberName = (id: string) => {
    const findedName = travelInfo.member.find((memeber) => memeber.id === id);

    return findedName?.name || '';
  };

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

        <div className="scrollbar-hide flex flex-col gap-4 overflow-auto">
          <div className="flex flex-col gap-2">
            <p className="font-bold">멤버별 지출</p>
            <Card className="flex flex-col gap-2">
              {travelInfo.member.map((member) => (
                <div
                  key={member.id}
                  className="flex items-start justify-between"
                >
                  <div className="flex items-center gap-1">
                    <User size={20} className="text-primary" />
                    <span className="font-bold">{member.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-state-error text-lg font-bold">
                      {convertComma(getTotalSpendAmountByMember(member.id))}원
                    </span>
                    <span className="text-text-secondary text-sm">
                      총 결제 금액:{' '}
                      {convertComma(getTotalPaymentAmountByMember(member.id))}원
                    </span>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">정산</p>
            <Card className="flex flex-col gap-3">
              {travelInfo.member.length && getAllTotalSpend() ? (
                <>
                  {getFinalSettlement().map((settlement) => (
                    <div
                      key={`${settlement.senderId}-${settlement.receiverId}`}
                      className="text-text-secondary flex flex-wrap items-center"
                    >
                      <span className="text-text-primary font-bold">
                        {getMemberName(settlement.senderId)}
                      </span>
                      &nbsp;
                      <MoveRight size={20} />
                      &nbsp;
                      <span className="text-text-primary font-bold">
                        {getMemberName(settlement.receiverId)}
                      </span>
                      &nbsp;
                      <span className="text-state-error font-bold">
                        {convertComma(settlement.amount)}원
                      </span>
                      을 보내야해요
                    </div>
                  ))}
                </>
              ) : (
                <div className='flex justify-center'>
                  <span className="text-text-secondary text-sm">정산할 내역이 없어요</span>
                </div>
              )}
            </Card>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">내 지출 정리</p>
            <Card className="flex flex-col gap-2">
              <div className="flex items-baseline gap-1">
                <span>총 결제 금액:</span>
                <span className="text-state-error text-lg font-bold">
                  {convertComma(
                    getTotalPaymentAmountByMember(travelInfo.member[0]?.id),
                  )}
                  원
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span>받을 금액:</span>
                <span className="text-state-success text-lg font-bold">
                  {'NN'}원
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span>내 순수 지출:</span>
                <span className="text-state-error text-lg font-bold">
                  {'NN'}원
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SideModal>
  );
}
