'use client';

/**
 * @file: BriefIntroduceTabs.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: BriefIntroduceTabs 컴포넌트, 서비스 간략 소개 탭
 */

import { useState, useCallback } from 'react';
import { cn } from '@/shared/lib/utils';
import { TTabTypes } from '@/features/home/types';
import { TABLIST } from '@/features/home/constants';
import SchaduleBriefView from '@/features/home/components/briefTab/schedule/SchaduleBriefView';
import ExpensesBriefView from '@/features/home/components/briefTab/expenses/ExpensesBriefView';
import MemoryBriefView from '@/features/home/components/briefTab/memory/MemoryBriefView';
import TimelineBriefView from '@/features/home/components/briefTab/timeline/TimelineBriefView';

// interface IBriefIntroduceTabs {}

export default function BriefIntroduceTabs() {
  const [selectedTab, setSelectedTab] = useState<TTabTypes>('schedule');

  /** 탭 클릭 */
  // const onClickTab = useCallback((list: ILabelValue<TTabTypes>) => {
  //   setSelectedTab(list.value);
  // }, []);

  return (
    <div className='flex flex-col gap-1 w-175 h-85 max-mobile:w-full max-mobile:h-76'>
      <div className="flex gap-2.5">
        {TABLIST.map((list) => (
          <div
            key={list.value}
            className={cn(
              'cursor-pointer px-1.5 py-1',
              selectedTab === list.value
                ? 'border-b-2 border-white text-white'
                : 'text-text-caption',
            )}
            onClick={() => setSelectedTab(list.value)}
          >
            <span>{list.label}</span>
          </div>
        ))}
      </div>
      <div className='h-full'>
        {selectedTab === 'schedule' && <SchaduleBriefView />}
        {selectedTab === 'expenses' && <ExpensesBriefView />}
        {selectedTab === 'memory' && <MemoryBriefView />}
        {selectedTab === 'timeline' && <TimelineBriefView />}
      </div>
    </div>
  );
}
