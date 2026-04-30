/**
 * @file: AddPlaceModal.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: AddPlaceModal 컴포넌트, 여행 장소 추가 모달
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Chip } from '@/shared/components/ui/Chip';
import { Input } from '@/shared/components/ui/Input';
import { Loading } from '@/shared/components/ui/Loading';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

interface IAddPlaceModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function AddPlaceModal({ isOpen, handleClose }: IAddPlaceModal) {
  const [searchPlace, setSearchPlace] = useState<string>('');
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedplaces, setSelectedplaces] = useState<any[]>([]);
  const [resultMsg, setResultMsg] = useState('');

  /** TODO: 임시 테스트 */
  const handleSearch = async () => {
    setIsLoading(true);

    try {
    } catch (e) {
      setPlaceList([]);
      setResultMsg('검색된 장소가 없어요');
    } finally {
      setIsLoading(false);
    }
  };

  /** 장소 선택 */
  const selectPlace = (list: any) => {
    setSelectedplaces([...selectedplaces, list]);
    setSearchPlace('');
  };

  /** 선택한 도시 제거 */
  const deleteSelectedPlace = (_id: string) => {
    const filtered = selectedplaces.filter((place) => place.id !== _id);
    setSelectedplaces(filtered);
  };

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    dataReset();
  };

  /** 데이터 초기화 */
  const dataReset = () => {
    setSearchPlace('');
    setPlaceList([]);
  };

  return (
    <SideModal
      isOpen={isOpen}
      title="장소 추가"
      handleClose={onClickCloseBtn}
      footer={
        <>
          <Button variant="gray" onClick={onClickCloseBtn}>
            취소
          </Button>
          <Button disabled={!selectedplaces.length} onClick={onClickCloseBtn}>
            장소 추가
          </Button>
        </>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Input
            label="장소 검색"
            placeholder="장소명으로 검색"
            isRequired
            onChange={(e) => setSearchPlace(e.target.value)}
            value={searchPlace}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              e.key === 'Enter' && handleSearch();
            }}
            suffix={
              <>
                {isLoading ? (
                  <Loading size="sm" />
                ) : (
                  <Search
                    className="h-4 w-4 cursor-pointer"
                    onClick={handleSearch}
                  />
                )}
              </>
            }
            description="가고싶은 장소를 검색해주세요."
          />
          {placeList.length ? (
            placeList.map((list) => (
              <div key={list.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-lg">{list.name}</p>
                  <span className="text-text-secondary text-sm">
                    {list.address}
                  </span>
                </div>
                {selectedplaces.find((city) => city.id === list.id) ? (
                  <Chip
                    variant="redOutline"
                    onClick={() => deleteSelectedPlace(list.id)}
                  >
                    취소
                  </Chip>
                ) : (
                  <Chip variant="gray" onClick={() => selectPlace(list)}>
                    선택
                  </Chip>
                )}
              </div>
            ))
          ) : (
            <>
              {!placeList.length && resultMsg ? (
                <span className="text-text-secondary">{resultMsg}</span>
              ) : null}
            </>
          )}
        </div>
        {selectedplaces.length ? (
          <div className="flex flex-col">
            <p className="text-text-secondary pb-1 text-sm">선택된 도시</p>
            <div className="scrollbar-hide flex gap-1 overflow-x-auto pb-3">
              {selectedplaces.map((city) => (
                <Chip
                  key={city.id}
                  className="shrink-0"
                  variant="gray"
                  suffix={<X className="h-4 w-4" />}
                  onClick={() => deleteSelectedPlace(city.id)}
                >
                  {city.name}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SideModal>
  );
}
