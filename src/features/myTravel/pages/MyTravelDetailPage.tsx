/**
 * @file: MyTravelDetailPage.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: MyTravelDetailPage 컴포넌트, 내 여행 상세 페이지
 */

'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/shared/lib/utils';
import PageHeader from '@/shared/components/ui/PageHeader';
import { TRAVEL_DETAIL_MOCK_DATA } from '@/features/myTravel/data';
import TravelStatus from '@/features/myTravel/components/TravelStatus';
import { convertFormattedDate, getDay, getTravelDay } from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import { TRAVEL_TAB_LIST } from '@/features/myTravel/constants';
import { TRAVEL_TAB } from '@/shared/types/Enum';
import { Button } from '@/shared/components/ui/Button';

interface IMyTravelDetailPage {}

export default function MyTravelDetailPage() {
  const {
    id,
    title,
    from,
    to,
    status,
    style,
    companion,
    image,
    schedule,
    cities,
  } = TRAVEL_DETAIL_MOCK_DATA;

  const [selectedTab, setSelectedTab] = useState(TRAVEL_TAB.SCHEDULE);

  /** 여행 기간 날짜 포멧 */
  const formattedValue = useMemo(() => {
    if (!from || !to) return '';

    if (from === to) {
      return `${convertFormattedDate(from)}(${getDay(from)}) (${getTravelDay(from, to)}일)`;
    }

    return `${convertFormattedDate(from)}(${getDay(from)}) ~ ${convertFormattedDate(to)}(${getDay(to)}) (${getTravelDay(from, to)}일)`;
  }, [from, to]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title={title}
        ruby={<TravelStatus status={status} from={from} to={to} />}
        titleBtn={
          <div className="text-text-secondary shrink-0 cursor-pointer font-bold">
            수정
          </div>
        }
        description={`${formattedValue} | `}
      />
      <div className='flex items-center justify-between'>
        <div className="flex items-center gap-1">
          {TRAVEL_TAB_LIST.map((list) => (
            <Chip
              variant={selectedTab === list.value ? 'primary' : 'gray'}
              size="lg"
              onClick={() => setSelectedTab(list.value)}
            >
              {list.label}
            </Chip>
          ))}
        </div>
        <div className='flex gap-1'>
          <Button variant='gray' size='sm'>체크리스트</Button>
          <Button variant='gray' size='sm'>현지정보</Button>
        </div>
      </div>
    </div>
  );
}
