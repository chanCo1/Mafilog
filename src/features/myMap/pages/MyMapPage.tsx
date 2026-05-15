/**
 * @file: MyMapPage.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 추억 채우기 페이지
 */

'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import PageHeader from '@/shared/components/ui/PageHeader';
import { Chip } from '@/shared/components/ui/Chip';
import { MAP_TRAVEL_TYPE_LIST } from '@/shared/constants';
import { ILabelValue } from '@/shared/interfaces';
import AmchartMap from '@/shared/components/map/AmchartMap';
import { TRAVEL_TYPE } from '@/shared/types/Enum';
import CreateFillMemoryModal from '@/features/myMap/components/modal/CreateFillMemoryModal';

interface IMyMapPage {}

export default function MyMapPage() {
  const [selectedMap, setSelectedMap] = useState<ILabelValue>(
    MAP_TRAVEL_TYPE_LIST[0],
  );
  const [isOpenFillModal, setIsOpenFillModal] = useState(false);

  const isWorld = selectedMap.value === TRAVEL_TYPE.WORLD;
  const isDomestic = selectedMap.value === TRAVEL_TYPE.DOMESTIC;

  return (
    <div className="flex h-full flex-col gap-5">
      <PageHeader
        title="추억 채우기"
        description="소중했던 순간을 채워보세요"
      />

      <div className="flex gap-1">
        {MAP_TRAVEL_TYPE_LIST.map((list) => (
          <Chip
            key={list.value}
            size="lg"
            variant={selectedMap.value === list.value ? 'primary' : 'gray'}
            onClick={() => setSelectedMap(list)}
          >
            {list.label}
          </Chip>
        ))}
      </div>

      <div className="h-full">
        {isWorld && (
          <div className="flex h-full flex-col">
            <span className="text-text-secondary text-center break-keep">
              추억이 비어있어요. 나만의 세계 여행 지도를 채워보세요.
            </span>
            <AmchartMap
              setSelectedMap={setSelectedMap}
              setIsOpenFillModal={() => setIsOpenFillModal(true)}
            />
          </div>
        )}
        {/* {isDomestic && <AmchartMap isDomestic />} */}
        {isDomestic && (
          <div className="flex h-full flex-col">
            <span className="text-text-secondary text-center break-keep">
              아직 채워진 도시가 없어요. 소중한 첫 번째 추억을 남겨보세요.
            </span>
            <AmchartMap
              isDomestic
              setIsOpenFillModal={() => setIsOpenFillModal(true)}
            />
          </div>
        )}
      </div>

      <CreateFillMemoryModal
        isOpen={isOpenFillModal}
        handleClose={() => setIsOpenFillModal(false)}
      />
    </div>
  );
}
