/**
 * @file: ExpensesBrief.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: ExpensesBrief 컴포넌트
 */

import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { EXPNESES_INTRODUCE_LIST } from '@/features/home/constants';
import Image from 'next/image';
import { IntroduceList } from '@/features/home/components/briefTab/IntroduceList';
import ExpensesCard from '@/features/home/components/briefTab/expenses/ExpensesCard';
import { EXPENSES_MOCK_DATA } from '@/features/home/constants';

function ExpensesBrief() {
  return (
    <Card className="flex h-full gap-2.5" readonly>
      {/* 왼쪽 설명 */}
      <div className="flex w-2/5 flex-col gap-4 p-4 bg-white rounded-md max-mobile:w-full">
        <div>
          <p className="text-xl font-bold break-keep">
            쉽고 간편하게 지출내역을 <br /> 확인할 수 있습니다
          </p>
          <p className="text-text-secondary break-keep">
            지출 내역만 입력해도 통계부터 정산금액까지 한번에 확인
            가능해요
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {EXPNESES_INTRODUCE_LIST.map((list, index) => (
            <IntroduceList key={index} list={list} />
          ))}
        </div>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="relative w-3/5 p-4 max-mobile:hidden">
        <Image
          src="/expenses_chart.png"
          alt="가계부 차트 이미지"
          fill
          sizes='100%'
          className="object-contain opacity-10"
        />
        <div className="absolute top-1/2 left-1/2 flex w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-1.5">
          {EXPENSES_MOCK_DATA.map((data, index) => (
            <ExpensesCard
              key={index}
              name={data.name}
              type={data.type}
              currency={data.currency}
              payer={data.payer}
              paymentMethod={data.paymentMethod}
              spender={data.spender}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default memo(ExpensesBrief);
