/**
 * @file: MyTravelDetailPage.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: MyTravelDetailPage 컴포넌트, 내 여행 상세 페이지
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
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
import TravelScheduleView from '@/features/myTravel/components/detail/schedule/TravelScheduleView';
import TravelExpensesView from '@/features/myTravel/components/detail/expneses/TravelExpensesView';
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import CreateNewTravelModal from '@/features/myTravel/components/modal/CreateNewTravelModal';
import { useTravelStore } from '@/shared/stores/useTravelStore';

// interface IMyTravelDetailPage {}

export default function MyTravelDetailPage() {
  const setInitTravel = useTravelStore((state) => state.setInitTravel);
  const travelInfo = useTravelStore((state) => state.travelInfo);

  useEffect(() => {
    const {
      id,
      title,
      from,
      to,
      status,
      travelPartner,
      travelStyles,
      image,
      schedule,
      cities,
    } = TRAVEL_DETAIL_MOCK_DATA;

    setInitTravel({
      id,
      cities,
      from,
      status,
      title,
      to,
      travelPartner,
      travelPeriod: getTravelDay(from, to),
      travelStyles,
    });
  }, []);

  const [isOpenTravelModify, setIsOpenTravelModify] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TRAVEL_TAB>(
    TRAVEL_TAB.SCHEDULE,
  );

  /** 여행 기간 날짜 포멧 */
  const formattedValue = useMemo(() => {
    if (!travelInfo.from || !travelInfo.to) return '';

    if (travelInfo.from === travelInfo.to) {
      return `${convertFormattedDate(travelInfo.from)}(${getDay(travelInfo.from)}) (${getTravelDay(travelInfo.from, travelInfo.to)}일)`;
    }

    return `${convertFormattedDate(travelInfo.from)}(${getDay(travelInfo.from)}) ~ ${convertFormattedDate(travelInfo.to)}(${getDay(travelInfo.to)}) (${getTravelDay(travelInfo.from, travelInfo.to)}일)`;
  }, [travelInfo.from, travelInfo.to]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title={travelInfo.title}
        ruby={
          <TravelStatus
            status={travelInfo.status}
            from={travelInfo.from}
            to={travelInfo.to}
          />
        }
        titleBtn={
          <div
            className="text-text-secondary shrink-0 cursor-pointer font-bold"
            onClick={() => setIsOpenTravelModify(true)}
          >
            수정
          </div>
        }
        description={
          <div className="max-mobile:flex-col mobile:gap-1 max-mobile:items-start flex items-center">
            <span>{formattedValue}</span>
            <span className="max-mobile:hidden">|</span>
            <div className="text-md flex gap-1">
              <div>{convertTravelPartner(travelInfo.travelPartner)}</div>
              {travelInfo.travelStyles.length &&
                travelInfo.travelStyles.map((style) => (
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
      <div className="relative">
        <FadeInOutStyled isShow={selectedTab === TRAVEL_TAB.SCHEDULE}>
          <TravelScheduleView />
        </FadeInOutStyled>
        <FadeInOutStyled isShow={selectedTab === TRAVEL_TAB.EXPENSES}>
          <TravelExpensesView from={travelInfo.from} to={travelInfo.to} />
        </FadeInOutStyled>
      </div>
      <CreateNewTravelModal
        isOpen={isOpenTravelModify}
        isModify
        handleClose={() => setIsOpenTravelModify(false)}
      />
    </div>
  );
}
