/**
 * @file: MemoryBrief.tsx
 * @author: chad
 * @since: 2026.04.21 ~
 * @description: MemoryBrief 컴포넌트
 */

import { memo } from 'react';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/components/ui/Card';
import Image from 'next/image';
import { MEMORY_INTRODUCE_LIST } from '@/features/home/constants';
import { IntroduceList } from '@/features/home/components/briefTab/IntroduceList';
import { Button } from '@/shared/components/ui/Button';

function MemoryBrief() {
  return (
    <Card className="flex h-full gap-2.5" readonly>
      {/* 왼쪽 설명 */}
      <div className="max-mobile:w-full flex w-2/5 flex-col gap-4 rounded-md bg-white p-4">
        <div>
          <p className="text-xl font-bold break-keep">
            소중했던 순간을 <br /> 채워보세요
          </p>
          <p className="text-text-secondary">
            추억을 남기고 싶은 사진으로 국·내외 지도를 색칠하여 기록할 수
            있습니다
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          {MEMORY_INTRODUCE_LIST.map((list, index) => (
            <IntroduceList key={index} list={list} />
          ))}
        </div>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="max-mobile:hidden relative w-3/5 p-4">
        <Image
          src="/world_map.png"
          alt="세계 지도 이미지"
          fill
          sizes='100%'
          className="object-contain opacity-20"
        />
        <Image
          src="/korea_map.png"
          alt="한국 지도 이미지"
          width={160}
          height={150}
          className="opacity-20"
        />
        <div className="absolute top-1/2 left-1/2 flex w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
          <div className="justify-cetner flex flex-col items-center gap-2.5 rounded-lg bg-white p-2.5 shadow-md w-50">
            <p className="w-full py-2 text-center">어디에 추억을 채울까요?</p>
            <div className="flex w-full items-center justify-end">
              <Button variant="none" className={cn('text-primary')}>
                채우기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(MemoryBrief);
