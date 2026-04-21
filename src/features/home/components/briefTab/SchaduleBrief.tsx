/**
 * @file: SchaduleBrief.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: SchaduleBrief 컴포넌트
 */

import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import { Check } from 'lucide-react';
import { SCHEDULE_INTRODUCE_LIST } from '@/features/home/constants';
import Image from 'next/image';
import { CircledNumber } from '@/shared/components/ui/CircledNumber';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';

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
    <Card className="flex h-full gap-2.5">
      {/* 왼쪽 설명 */}
      <div className="flex w-[40%] flex-col gap-4 p-4">
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
      <div className="relative w-[60%] p-4">
        <Image
          src="/schadule_map.png"
          alt="일정 간략소개 지도 이미지"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3/4">
          {SCHEDULE_MOCK_DATA.map((data, index) => (
            <ScheduleCard
              key={index}
              name={data.name}
              type={data.type}
              category={data.category}
              city={data.city}
              country={data.country}
              count={index}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default memo(SchaduleBrief);

/** 간략 소개 설명 리스트 */
export const IntroduceList = ({ list }: { list: string }) => {
  return (
    <div className="flex items-center gap-1">
      <Check className="text-primary h-5 w-5" />
      <span>{list}</span>
    </div>
  );
};

interface IScheduleCard {
  name: string;
  type: string;
  category?: string;
  country?: string;
  city?: string;
  count?: number;
}
/** 일정 카드 컴포넌트 */
export const ScheduleCard = ({
  name,
  category,
  city,
  country,
  type,
  count,
}: IScheduleCard) => {
  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col items-center">
        <div className="shrink-0">
          {type === 'location' ? (
            <CircledNumber number={count! + 1} />
          ) : (
            <CategoryIcon variant="memo" />
          )}
        </div>
        <div className="border-primary w-px flex-1 border border-dashed" />
      </div>
      <div className="pb-2.5 w-full">
        <Card
          variant="shadowed"
          className="flex flex-col items-center justify-center"
        >
          <p
            className={cn(
              type === 'location' ? 'text-lg font-bold' : 'text-text-secondary text-sm',
            )}
          >
            {name}
          </p>
          <div className="text-text-secondary text-sm">
            {category && (
              <>
                <span>{category}</span>&nbsp;&#8226;&nbsp;
              </>
            )}
            {city && (
              <>
                <span>{city}</span>&nbsp;&#8226;&nbsp;
              </>
            )}
            {country && <span>{country}</span>}
          </div>
        </Card>
      </div>
    </div>
  );
};
