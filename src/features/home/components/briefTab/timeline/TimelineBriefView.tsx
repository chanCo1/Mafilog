/**
 * @file: TimelineBrief.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: TimelineBrief 컴포넌트
 */

import { memo } from 'react';
import { Card } from '@/shared/components/ui/Card';
import Image from 'next/image';
import { IntroduceList } from '@/features/home/components/briefTab/IntroduceList';
import {
  TIMELINE_INTRODUCE_LIST,
  TIMELINE_MOCK_DATA,
} from '@/features/home/constants';
import TimelineCard from '@/features/home/components/briefTab/timeline/TimelineCard';

// interface ITimelineBrief {}

function TimelineBrief() {
  return (
    <Card className="flex h-full gap-2.5" readonly>
      {/* 왼쪽 설명 */}
      <div className="max-mobile:w-full flex w-2/5 flex-col gap-4 rounded-md bg-white p-4">
        <div>
          <p className="text-xl font-bold break-keep">
            언제 · 어디서 · 얼마나 <br /> 지출했는지 한 눈에
          </p>
          <p className="text-text-secondary break-keep">
            그동안 다녔던 여행을 타임라인으로 보고, 지출내역도 확인해보세요
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {TIMELINE_INTRODUCE_LIST.map((list, index) => (
            <IntroduceList key={index} list={list} />
          ))}
        </div>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="max-mobile:hidden relative w-3/5 p-4">
        <div className="w-63">
          <Image
            src="/timeline_chart.png"
            alt="세계 지도 이미지"
            width={300}
            height={1}
            className="object-contain opacity-10"
          />
        </div>
        <div className="absolute top-1/2 right-0 flex w-3/5 -translate-y-1/2 flex-col">
          {TIMELINE_MOCK_DATA.map((data, index) => (
            <TimelineCard
              key={index}
              name={data.name}
              index={TIMELINE_MOCK_DATA.length - index}
              partner={data.partner}
              style={data.style}
              type={data.type}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default memo(TimelineBrief);
