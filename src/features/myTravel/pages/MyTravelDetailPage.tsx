/**
 * @file: MyTravelDetailPage.tsx
 * @author: chad
 * @since: 2026.04.27 ~
 * @description: MyTravelDetailPage 컴포넌트, 내 여행 상세 페이지
 */

'use client';

import { useState } from 'react';
import { convertTravelStyle } from '@/shared/lib/utils';
import PageHeader from '@/shared/components/ui/PageHeader';
import TravelStatus from '@/features/myTravel/components/detail/TravelStatus';
import {
  convertTravelPartner,
  convertTravelDateRange,
} from '@/shared/lib/utils';
import { Chip } from '@/shared/components/ui/Chip';
import { TRAVEL_TAB_LIST } from '@/features/myTravel/constants';
import { TRAVEL_TAB } from '@/shared/types/Enum';
import { Button } from '@/shared/components/ui/Button';
import TravelScheduleView from '@/features/myTravel/components/detail/schedule/TravelScheduleView';
import TravelExpensesView from '@/features/myTravel/components/detail/expnese/TravelExpensesView';
import FadeInOutStyled from '@/shared/components/FadeInOutStyled';
import CreateNewTravelModal from '@/features/myTravel/components/modal/CreateNewTravelModal';
import LocalInfoModal from '@/features/myTravel/components/modal/LocalInfoModal';
import CheckListModal from '@/features/myTravel/components/modal/CheckListModal';
import ExpenseStatisticModal from '@/features/myTravel/components/modal/ExpenseStatisticModal';
import ExpenseSettleUpModal from '@/features/myTravel/components/modal/ExpenseSettleUpModal';
import { useFetchMyTravelDetail } from '@/features/myTravel/hooks/rquery/useFetchMyTravelDetail';
import { useParams } from 'next/navigation';

// import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
// import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
// import { useTravelCheckListStore } from '@/shared/stores/useTravelCheckListStore';
// import { useTravelExpenseStore } from '@/shared/stores/useTravelExpenseStore';

export default function MyTravelDetailPage() {
  const params = useParams();
  const { data: myTravelDatail } = useFetchMyTravelDetail(
    Number(params.travelId),
  );

  // const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  // const setInitTravelInfo = useTravelInfoStore(
  //   (state) => state.setInitTravelInfo,
  // );

  // const setInitSchedules = useTravelScheduleStore(
  //   (state) => state.setInitSchedules,
  // );
  // const setInitExpense = useTravelExpenseStore((state) => state.setInitExpense);
  // const setInitCheckList = useTravelCheckListStore(
  //   (state) => state.setInitCheckList,
  // );

  // useEffect(() => {
  //   /** TODO: 임시 데이터 */
  //   const {
  //     id,
  //     title,
  //     from,
  //     to,
  //     status,
  //     travelPartner,
  //     travelStyles,
  //     image,
  //     // schedule,
  //     cities,
  //     member,
  //   } = TRAVEL_DETAIL_MOCK_DATA;

  //   setInitTravelInfo({
  //     id,
  //     cities,
  //     from,
  //     status,
  //     title,
  //     to,
  //     travelPartner,
  //     travelPeriod: getTravelDay(from, to),
  //     travelStyles,
  //     member,
  //   });
  //   setInitSchedules({ from, to });
  //   setInitExpense({ from, to });
  //   setInitCheckList(CHECKLIST_MOCK_DATA);

  //   return () => {
  //     useTravelInfoStore.getState().reset();
  //   };
  // }, []);

  const [selectedTab, setSelectedTab] = useState<TRAVEL_TAB>(
    TRAVEL_TAB.SCHEDULE,
  );

  /** 모달 컨트롤 */
  const [isOpenTravelModify, setIsOpenTravelModify] = useState(false);
  const [isOpenLocalInfoModal, setIsOpenLocalInfoModal] = useState(false);
  const [isOpenCheckListModal, setIsOpenCheckListModal] = useState(false);
  const [isOpenStatisticModal, setIsOpenStatisticModal] = useState(false);
  const [isOpenSettelUpModal, setIsOpenSettelUpModal] = useState(false);

  if (!myTravelDatail) return;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title={myTravelDatail.title}
        ruby={
          <TravelStatus from={myTravelDatail.from} to={myTravelDatail.to} />
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
            <span className="max-mobile:text-md">
              {convertTravelDateRange(myTravelDatail.from, myTravelDatail.to)}
            </span>
            <span className="max-mobile:hidden">|</span>
            <div className="text-md max-mobile:text-sm flex gap-1">
              <div>{convertTravelPartner(myTravelDatail.travelPartner)}</div>
              {myTravelDatail.travelStyles.length ? (
                <>
                  {myTravelDatail.travelStyles.map((style) => (
                    <div key={style}>#{convertTravelStyle(style)}</div>
                  ))}
                </>
              ) : null}
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
              <Button
                variant="gray"
                size="xs"
                onClick={() => setIsOpenStatisticModal(true)}
              >
                통계
              </Button>
              <Button
                variant="gray"
                size="xs"
                onClick={() => setIsOpenSettelUpModal(true)}
              >
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
          <TravelExpensesView />
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

      {/* 통계 모달 */}
      <ExpenseStatisticModal
        isOpen={isOpenStatisticModal}
        handleClose={() => setIsOpenStatisticModal(false)}
      />

      {/* 정산 모달 */}
      <ExpenseSettleUpModal
        isOpen={isOpenSettelUpModal}
        handleClose={() => setIsOpenSettelUpModal(false)}
      />
    </div>
  );
}
