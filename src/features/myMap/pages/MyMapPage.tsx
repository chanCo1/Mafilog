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
import { useGetMemoryList } from '@/features/myMap/hooks/rquery/useGetMemoryList';

interface IMyMapPage {}

export default function MyMapPage() {
  const [selectedMapType, setSelectedMapType] = useState<ILabelValue>(
    MAP_TRAVEL_TYPE_LIST[0],
  );
  // 선택한 지도 아이디
  const [selectedMapId, setSelectedMapId] = useState<string | undefined>(
    undefined,
  );
  const [isOpenFillModal, setIsOpenFillModal] = useState(false);

  const isWorld = selectedMapType.value === TRAVEL_TYPE.WORLD;
  const isDomestic = selectedMapType.value === TRAVEL_TYPE.DOMESTIC;

  const { data: memoryList } = useGetMemoryList(
    selectedMapType.value as string,
  );
  console.log(memoryList);

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
            variant={selectedMapType.value === list.value ? 'primary' : 'gray'}
            onClick={() => setSelectedMapType(list)}
          >
            {list.label}
          </Chip>
        ))}
      </div>

      <div className="h-full">
        {isWorld && (
          <div className="flex h-full flex-col">
            <span className="text-text-secondary text-center break-keep">
              지도가 비어있어요. 나만의 세계 여행 지도를 채워보세요.
            </span>
            <AmchartMap
              isOpenFillModal={isOpenFillModal}
              setSelectedMapType={setSelectedMapType}
              setSelectedMapId={setSelectedMapId}
              setIsOpenFillModal={() => setIsOpenFillModal(true)}
            />
          </div>
        )}
        {isDomestic && (
          <div className="flex h-full flex-col">
            <span className="text-text-secondary text-center break-keep">
              아직 채워진 도시가 없어요. 소중한 첫 번째 추억을 남겨보세요.
            </span>
            <AmchartMap
              isOpenFillModal={isOpenFillModal}
              isDomestic
              setSelectedMapId={setSelectedMapId}
              setIsOpenFillModal={() => setIsOpenFillModal(true)}
            />
          </div>
        )}
      </div>

      <CreateFillMemoryModal
        isOpen={isOpenFillModal}
        handleClose={() => setIsOpenFillModal(false)}
        selectedMapType={selectedMapType.value as string}
        selectedMapId={selectedMapId}
      />
    </div>
  );
}
