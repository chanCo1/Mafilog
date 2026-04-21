/**
 * @file: SchaduleBrief.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: SchaduleBrief 컴포넌트
 */

import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { SCHEDULE_INTRODUCE_LIST } from '@/features/home/constants';
import Image from 'next/image';
import { IntroduceList } from '@/features/home/components/briefTab/IntroduceList';
import { ScheduleCard } from '@/features/home/components/briefTab/ScheduleCard';

const SCHEDULE_MOCK_DATA = [
  {
    name: '아사쿠사 규카츠',
    type: 'location',
    category: '음식점',
    country: '일본',
    city: '아사쿠사',
  },
  {
    name: '중간에 약국 들려서 약 사기!',
    type: 'memo',
    category: '',
    country: '',
    city: '',
  },
  {
    name: '센소지',
    type: 'location',
    category: '관광명소',
    country: '일본',
    city: '아사쿠사',
  },
];

// interface ISchaduleBrief {}

function SchaduleBrief() {
  return (
    <Card className="flex h-full gap-2.5" readonly>
      {/* 왼쪽 설명 */}
      <div className="flex w-2/5 flex-col gap-4 p-4">
        <div>
          <p className="text-xl font-bold">
            내 여행의 일정을 <br /> 한 곳에서
          </p>
          <p className="text-text-secondary">
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
      <div className="relative w-3/5 p-4">
        <Image
          src="/schadule_map.png"
          alt="일정 간략소개 지도 이미지"
          fill
          className="object-cover opacity-50"
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

export default memo(SchaduleBrief);
