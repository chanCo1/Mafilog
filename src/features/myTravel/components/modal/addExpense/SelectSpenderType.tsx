/**
 * @file: SelectSpenderType.tsx
 * @author: chad
 * @since: 2026.05.08 ~
 * @description: 지출 방식 (1/N, 지정)에 따른 결제 멤버 선택 컴포넌트
 */

import { Dispatch, SetStateAction, useMemo } from 'react';
import { EXPENSES_SPENDER_TYPE } from '@/shared/types/expenseEnum';
import Selectbox from '@/shared/components/ui/Selectbox';
import { Radio } from '@/shared/components/ui/Radio';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import RequireDot from '@/shared/components/ui/RequireDot';
import { ILabelValue } from '@/shared/interfaces';

interface ISelectSpenderType {
  selectedSpenderType: EXPENSES_SPENDER_TYPE;
  selectedSepnder: ILabelValue[];
  setSelectedSepnder: Dispatch<SetStateAction<ILabelValue[]>>;
  selectedPayer: ILabelValue;
  setSelectPayer: Dispatch<SetStateAction<ILabelValue>>;
}

/** 지출 방식 (1/N, 지정)에 따른 결제 멤버 선택 컴포넌트 */
export default function SelectSpenderType({
  selectedSpenderType,
  selectedSepnder,
  setSelectedSepnder,
  selectedPayer,
  setSelectPayer,
}: ISelectSpenderType) {
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);

  const getMembersOption = useMemo(() => {
    return travelInfo.member.map((member) => ({
      label: member,
      value: member,
    }));
  }, [travelInfo.member]);

  /** 1/N 선택 핸들링 */
  const handleSplitSpend = (value: ILabelValue) => {
    setSelectPayer(value);
    setSelectedSepnder(getMembersOption);
  };

  /** 지출자 선택 */
  const handleSelectSpender = (_member: string) => {
    if (!_member) return;

    setSelectedSepnder((prev) => {
      const isExist = prev?.some((item) => item.value === _member);

      if (isExist) {
        return prev?.filter((item) => item.value !== _member);
      } else {
        return [...prev, { label: _member, value: _member }];
      }
    });
  };

  return (
    <>
      {/* 1/N일 경우 노출 */}
      {selectedSpenderType === EXPENSES_SPENDER_TYPE.SPLIT && (
        <Selectbox
          label="결제 멤버"
          isRequired
          options={getMembersOption}
          value={selectedPayer}
          onChange={(value) => handleSplitSpend(value)}
        />
      )}

      {/* 지정일 경우 노출 */}
      {selectedSpenderType === EXPENSES_SPENDER_TYPE.ASSIGN && (
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between pr-3">
            <div className="flex min-w-25 items-center gap-1">
              <span>지정 지출</span>
              <RequireDot />
            </div>
            <div className="text-text-secondary flex items-center gap-5 text-sm">
              <span>결제</span>
              <span>지출</span>
            </div>
          </div>
          <div className="border-border-secondary flex flex-col gap-2 rounded-lg border p-3">
            {travelInfo.member.map((_member, index) => (
              <div
                key={`${_member}-${index}`}
                className="flex items-center justify-between"
              >
                <span className="font-bold">{_member}</span>
                <div className="flex items-center gap-5">
                  <Radio
                    id={_member}
                    isUserIcon
                    value={selectedPayer as ILabelValue}
                    onChange={(value) => setSelectPayer(value)}
                  />
                  <Checkbox
                    isUserIcon
                    value={Boolean(
                      selectedSepnder?.find(
                        (sepnder) => sepnder.value === _member,
                      ),
                    )}
                    onChange={() => handleSelectSpender(_member)}
                  />
                </div>
              </div>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            결제자는 1명만 선택가능해요.
          </span>
        </div>
      )}
    </>
  );
}
