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
import { TRAVEL_DETAIL_MOCK_DATA, CHECKLIST_MOCK_DATA } from '@/features/myTravel/data';
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
import TravelExpensesView from '@/features/myTravel/components/detail/expnese/TravelExpensesView';
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import CreateNewTravelModal from '@/features/myTravel/components/modal/CreateNewTravelModal';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import LocalInfoModal from '@/features/myTravel/components/modal/LocalInfoModal';
import CheckListModal from '@/features/myTravel/components/modal/CheckListModal';
import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
import { useTravelCheckListStore } from '@/shared/stores/useTravelCheckListStore';
import { useTravelExpenseListStore } from '@/shared/stores/useTravelExpenseStore';

// interface IMyTravelDetailPage {}

export default function MyTravelDetailPage() {
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const setInitTravelInfo = useTravelInfoStore((state) => state.setInitTravelInfo);

  const setInitSchedules = useTravelScheduleStore((state) => state.setInitSchedules)
  const setInitExpense = useTravelExpenseListStore((state) => state.setInitExpense)
  const setInitCheckList = useTravelCheckListStore((state) => state.setInitCheckList)


  useEffect(() => {
    /** TODO: 임시 데이터 */
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

    setInitTravelInfo({
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
    setInitSchedules({ from, to });
    setInitExpense({ from, to });
    setInitCheckList(CHECKLIST_MOCK_DATA);

    return () => {
      useTravelInfoStore.getState().reset();
    };
  }, []);

  const [selectedTab, setSelectedTab] = useState<TRAVEL_TAB>(
    TRAVEL_TAB.SCHEDULE,
  );

  /** 모달 컨트롤 */
  const [isOpenTravelModify, setIsOpenTravelModify] = useState(false);
  const [isOpenLocalInfoModal, setIsOpenLocalInfoModal] = useState(false);
  const [isOpenCheckListModal, setIsOpenCheckListModal] = useState(false);

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
            <Button
              variant="gray"
              size="xs"
              onClick={() => setIsOpenCheckListModal(true)}
            >
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
          <Button
            variant="gray"
            size="xs"
            onClick={() => setIsOpenLocalInfoModal(true)}
          >
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

      {/* 여행 수정 모달 */}
      <CreateNewTravelModal
        isOpen={isOpenTravelModify}
        handleClose={() => setIsOpenTravelModify(false)}
        isModify
      />

      {/* 체크리스트 모달 */}
      <CheckListModal
        isOpen={isOpenCheckListModal}
        handleClose={() => setIsOpenCheckListModal(false)}
      />

      {/* 현지 정보 모달 */}
      <LocalInfoModal
        isOpen={isOpenLocalInfoModal}
        handleClose={() => setIsOpenLocalInfoModal(false)}
      />
    </div>
  );
}
