/**
 * @file: MyTravelDetailPage.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: MyTravelDetailPage 컴포넌트, 내 여행 상세 페이지
 */

'use client';

import { useState, useMemo } from 'react';
import { cn, convertTravelStyle } from '@/shared/lib/utils';
import PageHeader from '@/shared/components/ui/PageHeader';
import { TRAVEL_DETAIL_MOCK_DATA } from '@/features/myTravel/data';
import TravelStatus from '@/features/myTravel/components/detail/TravelStatus';
import {
  convertFormattedDate,
  getDay,
  getTravelDay,
  convertTravelPartner,
} from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import { TRAVEL_TAB_LIST } from '@/features/myTravel/constants';
import { TRAVEL_TAB } from '@/shared/types/Enum';
import { Button } from '@/shared/components/ui/Button';
import TravelDetailDay from '@/features/myTravel/components/TravelDetailDay';

// interface IMyTravelDetailPage {}

export default function MyTravelDetailPage() {
  const {
    id,
    title,
    from,
    to,
    status,
    styles,
    partner,
    image,
    schedule,
    cities,
  } = TRAVEL_DETAIL_MOCK_DATA;

  const [selectedTab, setSelectedTab] = useState<TRAVEL_TAB>(TRAVEL_TAB.SCHEDULE);
  const [selectedDay, setSelectedDay] = useState(1);

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
        description={
          <div className="max-mobile:flex-col mobile:gap-1 max-mobile:items-start flex items-center">
            <span>{formattedValue}</span>
            <span className="max-mobile:hidden">|</span>
            <div className="text-md flex gap-1">
              <div>{convertTravelPartner(partner)}</div>
              {styles.length &&
                styles.map((style) => (
                  <div key={style}>#{convertTravelStyle(style)}</div>
                ))}
              여행
            </div>
          </div>
        }
      />
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1">
          {TRAVEL_TAB_LIST.map((list, index) => (
            <Chip
              key={`${list.label}-${index}`}
              variant={selectedTab === list.value ? 'primary' : 'gray'}
              size="lg"
              onClick={() => setSelectedTab(list.value)}
            >
              {list.label}
            </Chip>
          ))}
        </div>
        <div className="flex gap-1">
          {selectedTab === TRAVEL_TAB.SCHEDULE ? (
            <Button variant="gray" size="xs">
              체크리스트
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button variant="gray" size="xs">
                통계
              </Button>
              <Button variant="gray" size="xs">
                정산
              </Button>
            </div>
          )}
          <Button variant="gray" size="xs">
            현지 정보
          </Button>
        </div>
      </div>
      <div className="max-mobile:flex-col-reverse flex gap-4">
        <div className="max-mobile:w-full flex w-1/2 flex-col gap-4">
          {/* 상단 버튼 */}
          <div className="flex justify-between">
            <Button variant="gray" size="sm">
              선택 수정
            </Button>
            <div className="flex gap-1">
              <Button variant="secondary" size="sm">
                장소 추가
              </Button>
              <Button variant="secondary" size="sm">
                메모 추가
              </Button>
            </div>
          </div>
          <div className="scrollbar-hide max-h-200 overflow-y-auto">
            {/* [mask:linear-gradient(to_bottom,black_90%,transparent)] */}
            {Array.from({ length: getTravelDay(from, to) }).map((_, index) => {
              const _day = index + 1;
              const dupDate = new Date(from);
              dupDate.setDate(from.getDate() + index);

              return (
                <TravelDetailDay
                  key={`${dupDate}-${index}`}
                  day={_day}
                  date={dupDate}
                />
              );
            })}
          </div>
        </div>
        <div className="max-mobile:w-full flex w-1/2 flex-col gap-4">
          <div className="scrollbar-hide flex gap-1 overflow-x-auto">
            {Array.from({ length: getTravelDay(from, to) }).map((_, index) => (
              <Chip
                key={index}
                size="md"
                className="shrink-0"
                variant={
                  selectedDay === index + 1 ? 'primary' : 'primaryOutline'
                }
                onClick={() => setSelectedDay(index + 1)}
              >{`${index + 1}일차`}</Chip>
            ))}
          </div>
          <div className="max-mobile:h-60 h-110 w-full rounded-lg bg-red-50"></div>
        </div>
      </div>
    </div>
  );
}
