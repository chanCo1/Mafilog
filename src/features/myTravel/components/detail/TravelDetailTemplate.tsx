/**
 * @file: TravelDetailTemplate.tsx
 * @author: chad
 * @since: 2026.04.29 ~
 * @description: TravelDetailTemplate 컴포넌트, 여행 상세 페이지에서 사용할 일정, 가계부 템플릿
 */

import { ReactNode } from 'react';

interface ITravelDetailTemplate {
  handleButtons: ReactNode;
  dayTimelines: ReactNode;
  dayButtons: ReactNode;
  stautsArea: ReactNode;
}

export default function TravelDetailTemplate({
  handleButtons,
  dayTimelines,
  dayButtons,
  stautsArea,
}: ITravelDetailTemplate) {
  return (
    <div className="max-mobile:flex-col-reverse flex gap-4">
      <div className="max-mobile:w-full flex w-1/2 flex-col">
        {/* 타임라인 상단 버튼 */}
        <div className="sticky top-11.5 z-1 flex items-center justify-between bg-white py-2 [mask:linear-gradient(to_bottom,black_90%,transparent)]">
          {handleButtons}
        </div>
        {/* 일차별 타임라인 */}
        <div className='flex flex-col gap-2'>{dayTimelines}</div>
      </div>
      <div className="max-mobile:w-full flex w-1/2 flex-col">
        {/* 일차 선택 버튼 */}
        <div className="scrollbar-hide sticky max-mobile:relative top-11.5 max-mobile:top-0 flex gap-1 overflow-x-auto bg-white py-2">
          {dayButtons}
        </div>
        {/* 변경사항 상태 반영, 일정 -> 지도 / 가계부 -> 지출금액 */}
        <div className="sticky top-24 w-full">
          {stautsArea}
        </div>
      </div>
    </div>
  );
}
