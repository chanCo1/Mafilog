/**
 * @file: ScheduleBrief.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: ScheduleBrief 컴포넌트, 일정 간략 소개 카드
 */

import { memo } from 'react';
import { Card } from '@/shared/components/ui/Card';
import { SCHEDULE_INTRODUCE_LIST } from '@/features/home/constants';
import Image from 'next/image';
import { IntroduceList } from '@/features/home/components/briefTab/IntroduceList';
import { ScheduleCard } from '@/features/home/components/briefTab/schedule/ScheduleCard';
import { SCHEDULE_MOCK_DATA } from '@/features/home/constants';

function ScheduleBrief() {
  return (
    <Card className="flex h-full gap-2.5" readonly>
      {/* 왼쪽 설명 */}
      <div className="flex w-2/5 flex-col gap-4 p-4 bg-white rounded-md max-mobile:w-full">
        <div>
          <p className="text-xl font-bold break-keep">
            내 여행의 일정을 <br /> 한 곳에서
          </p>
          <p className="text-text-secondary break-keep">
            언제든지 수정 가능한 일정을 만들고 가고 싶었던 관광지를 꼭 가보세요
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {SCHEDULE_INTRODUCE_LIST.map((list, index) => (
            <IntroduceList key={index} list={list} />
          ))}
        </div>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="relative w-3/5 p-4 max-mobile:hidden">
        <Image
          src="/schadule_map.png"
          alt="일정 간략소개 지도 이미지"
          fill
          sizes='100%'
          priority
          className="object-fill opacity-30"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3/5">
          {SCHEDULE_MOCK_DATA.map((data, index) => (
            <ScheduleCard
              key={index}
              name={data.name}
              type={data.type}
              category={data.category}
              city={data.city}
              country={data.country}
              count={index}
              allSchedules={SCHEDULE_MOCK_DATA}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default memo(ScheduleBrief);
