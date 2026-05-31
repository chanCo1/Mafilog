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
import FillMemoryDetailModal from '@/features/myMap/components/modal/FillMemoryDetailModal';
import { useSession } from 'next-auth/react';

export default function MyMapPage() {
  const { data: userInfo } = useSession();

  const [selectedMapType, setSelectedMapType] = useState<ILabelValue>(
    MAP_TRAVEL_TYPE_LIST[0],
  );
  // 선택한 지도 아이디
  const [selectedMapId, setSelectedMapId] = useState<string | undefined>(
    undefined,
  );
  // 선택한 추억 id
  const [selectedMemoryId, setSelectedMemoryId] = useState(0);
  const [isOpenFillModal, setIsOpenFillModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [isFillMemoryModify, setIsFillMemoryModify] = useState(false);

  const isWorld = selectedMapType.value === TRAVEL_TYPE.WORLD;
  const isDomestic = selectedMapType.value === TRAVEL_TYPE.DOMESTIC;

  const { data: memoryList } = useGetMemoryList(
    selectedMapType.value as string,
    userInfo,
  );

  /** 추억 상세 모달에서 수정 클릭 시 */
  const handleUpdateMemoryDetail = () => {
    setIsOpenDetailModal(false);
    setIsOpenFillModal(true);
    setIsFillMemoryModify(true);
  };

  /** 추억 만들기 모달 핸들링 */
  const handleCloseCreateMemoryModal = () => {
    setIsOpenFillModal(false);
    setIsFillMemoryModify(false);
  };

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

      <div className={cn('h-full')}>
        {isWorld && (
          <div className="flex h-full flex-col gap-2">
            <div className="flex justify-center text-center break-keep">
              {memoryList?.length ? (
                <div>
                  벌써{' '}
                  <span className="text-primary font-bold">
                    {memoryList?.length}개의 나라
                  </span>
                  에 추억이 채워졌네요! 추억을 더 채워보세요
                </div>
              ) : (
                <span className="text-text-secondary">
                  지도가 비어있어요 나만의 세계 여행 추억을 채워보세요
                </span>
              )}
            </div>
            <AmchartMap
              isOpenFillModal={isOpenFillModal}
              setIsOpenFillModal={() => setIsOpenFillModal(true)}
              isOpenDetailModal={isOpenDetailModal}
              setIsOpenDetailModal={() => setIsOpenDetailModal(true)}
              setSelectedMapType={setSelectedMapType}
              setSelectedMapId={setSelectedMapId}
              setSelectedMemoryId={setSelectedMemoryId}
              memoryList={memoryList}
            />
          </div>
        )}
        {isDomestic && (
          <div className="flex h-full flex-col gap-2">
            <div className="flex justify-center text-center break-keep">
              {memoryList?.length ? (
                <div className="">
                  벌써{' '}
                  <span className="text-primary font-bold">
                    {memoryList?.length}개 도시
                  </span>
                  에 추억이 채워졌네요! 지도를 더 채워보세요
                </div>
              ) : (
                <span className="text-text-secondary">
                  아직 채워진 도시가 없어요 소중한 첫 번째 추억을 남겨보세요
                </span>
              )}
            </div>
            <AmchartMap
              isDomestic
              isOpenFillModal={isOpenFillModal}
              setIsOpenFillModal={() => setIsOpenFillModal(true)}
              isOpenDetailModal={isOpenDetailModal}
              setIsOpenDetailModal={() => setIsOpenDetailModal(true)}
              setSelectedMapId={setSelectedMapId}
              setSelectedMemoryId={setSelectedMemoryId}
              memoryList={memoryList}
            />
          </div>
        )}
      </div>

      <CreateFillMemoryModal
        isOpen={isOpenFillModal}
        handleClose={handleCloseCreateMemoryModal}
        selectedMapType={selectedMapType.value as string}
        selectedMapId={selectedMapId}
        setSelectedMapId={setSelectedMapId}
        selectedMemoryId={selectedMemoryId}
        setSelectedMemoryId={setSelectedMemoryId}
        isModify={isFillMemoryModify}
      />

      <FillMemoryDetailModal
        isOpen={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        selectedMemoryId={selectedMemoryId}
        setSelectedMemoryId={setSelectedMemoryId}
        selectedMapType={selectedMapType.value as string}
        handleUpdate={handleUpdateMemoryDetail}
      />
    </div>
  );
}
