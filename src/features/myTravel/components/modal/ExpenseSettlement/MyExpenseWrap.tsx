/**
 * @file: MyExpenseWrap.tsx
 * @author: chad
 * @since: 2026.05.13 ~
 * @description: 내 지출 정리 금액 노출 컴포넌트
 */

import { cn } from "@/shared/lib/utils";
import { Dot } from "lucide-react";

interface IMyExpenseWrap {
  name: string;
  amount: string | number;
  className?: string;
}

export default function MyExpenseWrap({
  amount,
  name,
  className,
}: IMyExpenseWrap) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Dot className="text-primary" />
        <span>{name}</span>
      </div>
      <span className={cn('text-state-error text-lg font-bold', className)}>{amount}원</span>
    </div>
  );
}
