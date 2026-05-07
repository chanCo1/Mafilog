/**
 * @file: ExpenseCategoryList.tsx
 * @author: chad
 * @since: 2026.05.06 ~
 * @description: 지출내역 카테고리 컴포넌트
 */

import { useState, HTMLAttributes, SetStateAction, Dispatch } from 'react';
import { cn } from '@/shared/lib/utils';
import RequireDot from '@/shared/components/ui/RequireDot';
import { Card } from '@/shared/components/ui/Card';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { EXPENSE_CATEGORY_LIST } from '@/features/myTravel/constants/expense.constant';
import { TIconList } from '@/shared/types/expenseEnum';

interface IExpenseCategoryList extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label?: string;
  isRequired?: boolean;
  description?: string;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<TIconList>>
}

export default function ExpenseCategoryList({
  className,
  label = '카테고리',
  isRequired,
  description,
  selectedCategory,
  setSelectedCategory,
  ...props
}: IExpenseCategoryList) {
  return (
    <div className={cn('flex flex-col gap-1')} {...props}>
      <div className="flex min-w-25 items-center gap-1">
        <span>{label}</span>
        {isRequired && <RequireDot />}
      </div>
      <Card>
        <div className="flex items-center justify-between px-6 py-1">
          {EXPENSE_CATEGORY_LIST.map((list, index) => (
            <div
              key={`${list.value}-${index}`}
              className={cn('flex cursor-pointer flex-col items-center px-1')}
              onClick={() => setSelectedCategory(list.value)}
            >
              <CategoryIcon
                variant={list.value as TIconList}
                className={cn('transition duration-300',
                  selectedCategory === list.value ? '' : 'text-gray-3',
                )}
                circled="none"
                size="md"
              />
              <span
                className={cn(
                  'text-sm',
                  selectedCategory === list.value ? '' : 'text-text-secondary',
                )}
              >
                {list.label}
              </span>
            </div>
          ))}
        </div>
      </Card>
      {description && (
        <span className="text-text-secondary text-sm">{description}</span>
      )}
    </div>
  );
}
