/**
 * @file: ExpenseSettleUpModal.tsx
 * @author: chad
 * @since: 2026.05.13 ~
 * @description: 가계부 정산 모달
 */

import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import { convertComma } from '@/shared/lib/utils';
import { User, MoveRight } from 'lucide-react';
import MyExpenseWrap from '@/features/myTravel/components/modal/ExpenseSettlement/MyExpenseWrap';
import Separator from '@/shared/components/ui/Separator';
import { useCalcExpense } from '@/features/myTravel/hooks/useCalcExpense';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useGetTravelExpenses } from '@/features/myTravel/hooks/rquery/expense/useGetTravelExpense';
import { useGetMyTravelDetail } from '@/features/myTravel/hooks/rquery/myTravel/useGetMyTravelDetail';
import { ANIMAL_EMOJI } from '@/shared/constants';

interface IExpenseSettleUpModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ExpenseSettleUpModal({
  isOpen,
  handleClose,
}: IExpenseSettleUpModal) {
  const travelId = useGetTravelId();
  const { data: travelInfo } = useGetMyTravelDetail(travelId);
  const { data: expenseList } = useGetTravelExpenses(travelId);
  const {
    getAllTotalSpend,
    getTotalPaymentAmountByMember,
    getTotalSpendAmountByMember,
    getFinalSettlement,
    getMyReceiveAmount,
    getMyNetExpense,
  } = useCalcExpense(expenseList ?? []);

  const getMemberName = (id: string) => {
    const findedName = travelInfo?.member.find((memeber) => memeber.userId === id);

    return findedName?.name || '';
  };

  if (!travelInfo) return;

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
            {convertComma(getAllTotalSpend)}원
          </span>
        </div>

        <div className="scrollbar-hide flex flex-col gap-4 overflow-auto">
          {travelInfo?.member ? (
            <>
              <div className="flex flex-col gap-2">
                <p className="">멤버별 지출</p>
                {travelInfo.member.map((member, index) => (
                  <div
                    key={member.userId}
                    className="flex items-start justify-between"
                  >
                    <div className="flex items-center gap-1">
                      <span>{ANIMAL_EMOJI[index]}</span>
                      <span className="">{member.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-state-error text-lg font-bold">
                        {convertComma(
                          getTotalSpendAmountByMember(member.userId),
                        )}
                        원
                      </span>
                      <span className="text-text-secondary text-sm">
                        총 결제 금액:{' '}
                        {convertComma(
                          getTotalPaymentAmountByMember(member.userId),
                        )}
                        원
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Separator position="horizontal" />
            </>
          ) : null}

          <div className="flex flex-col gap-2">
            <p className="">이번 여행 정산은</p>
            {travelInfo?.member?.length > 1 && getFinalSettlement.length ? (
              <>
                {getFinalSettlement.map((settlement) => (
                  <div
                    key={`${settlement.sendId}-${settlement.receiveId}`}
                    className="text-text-secondary flex flex-wrap items-center"
                  >
                    <div className="mr-1 text-lg">💸</div>
                    <span className="text-text-primary font-bold">
                      {getMemberName(settlement.sendId)}
                    </span>
                    &nbsp;
                    <MoveRight size={20} />
                    &nbsp;
                    <span className="text-text-primary font-bold">
                      {getMemberName(settlement.receiveId)}
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
              <div className="flex justify-center">
                <span className="text-text-secondary text-sm">
                  정산할 내역이 없어요
                </span>
              </div>
            )}
          </div>

          <Separator position="horizontal" />

          <div className="flex flex-col gap-2">
            <p className="">내 지출 정리</p>
            <MyExpenseWrap
              name="총 결제 금액"
              amount={convertComma(
                getTotalPaymentAmountByMember(travelInfo.member[0]?.userId),
              )}
            />
            <MyExpenseWrap
              name="총 지출 금액"
              amount={convertComma(
                getTotalSpendAmountByMember(travelInfo.member[0]?.userId),
              )}
            />
            <MyExpenseWrap
              name="받을 금액"
              amount={convertComma(
                getMyReceiveAmount(travelInfo.member[0]?.userId),
              )}
              className="text-state-success"
            />
            <MyExpenseWrap
              name="내 순수 지출"
              amount={convertComma(
                getMyNetExpense(travelInfo.member[0]?.userId),
              )}
            />
          </div>
        </div>
      </div>
    </SideModal>
  );
}
