/**
 * @file: AddPlaceModal.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: AddPlaceModal 컴포넌트, 여행 장소 추가 모달
 */

import { useState, useMemo, useEffect } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Chip } from '@/shared/components/ui/Chip';
import { Input } from '@/shared/components/ui/Input';
import { Loading } from '@/shared/components/ui/Loading';
import { Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { getPlaceCategory } from '@/shared/lib/utils';
import Selectbox from '@/shared/components/ui/Selectbox';
import { ILabelValue } from '@/shared/interfaces';
import GoogleMap from '@/shared/components/map/GoogleMap';
import SelectedChips from '@/features/myTravel/components/modal/SelectedChips';
import { useTravelInfoStore } from '@/shared/stores/useTravelInfoStore';
import { toast } from 'sonner';
import useTravelDaysList from '@/features/myTravel/hooks/useTravelDaysList';
import { useTravelScheduleStore } from '@/shared/stores/useTravelScheduleStore';
import { useFetchGooglePlaces } from '@/shared/hooks/rquery/useFetchGooglePlaces';

interface IAddPlaceModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function AddPlaceModal({ isOpen, handleClose }: IAddPlaceModal) {
  const travelInfo = useTravelInfoStore((state) => state.travelInfo);
  const setAddScheduleList = useTravelScheduleStore(
    (state) => state.setAddScheduleList,
  );
  const travelDaysList = useTravelDaysList({
    from: travelInfo.from,
    to: travelInfo.to,
  });

  /** 장소 검색 */
  const [searchPlace, setSearchPlace] = useState<string>('');
  /** 검색된 장소 리스트 */
  const [placeList, setPlaceList] = useState<IPlaceList[]>([]);
  /** 검색 결과 메시지 */
  const [resultMsg, setResultMsg] = useState('');
  /** 클릭한 장소 정보 */
  const [clickPlaceData, setClickPlaceData] = useState<IPlaceList>();
  /** 로딩 여부 */

  /** 일정 선택 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>();
  /** 장소 선택 */
  const [selectedPlaces, setSelectedPlaces] = useState<IPlaceList[]>([]);

  const [submitSearch, setSubmitSearch] = useState<string>('');
  const { data: searchData, isLoading } = useFetchGooglePlaces({
    search: submitSearch,
  });

  /** 일정 선택 초기값 */
  // useEffect(() => {
  //   if (travelInfo.from && travelInfo.to) {
  //     setSelectedDay(
  //       travelDaysList[getTravelCurrentDay(travelInfo.from, travelInfo.to) - 1],
  //     );
  //   }
  // }, [travelInfo.from, travelInfo.to, travelDaysList]);

  useEffect(() => {
    setSelectedDay(travelDaysList[0]);
  }, [travelDaysList]);

  const handleSearch = async () => {
    try {
      // 검색 전 초기화 한번 진행
      setSubmitSearch('');
      setSubmitSearch(searchPlace);
    } catch (error) {
      console.error('GooglePlaces 검색 에러:', error);
    }
  };

  useEffect(() => {
    if (searchData?.places?.length) {
      /** 도시 정보 추출 */
      const getPlaceData = searchData.places.map((place) => {
        const getCountryCode = place.addressComponents.find((comp) =>
          comp?.types?.includes('country'),
        );

        const country = {
          name: getCountryCode?.longText,
          code: getCountryCode?.shortText,
        };

        return {
          id: place.id,
          name: place.displayName.text,
          address: place.formattedAddress,
          country,
          location: {
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
          types: place.types,
        };
      });

      setPlaceList(getPlaceData);
    } else {
      setPlaceList([]);
      setResultMsg('검색된 장소가 없어요');
    }
  }, [searchData]);

  /** 장소 선택 */
  const selectPlace = (list: any) => {
    setSelectedPlaces([...selectedPlaces, list]);
    setSearchPlace('');
  };

  /** 선택한 도시 제거 */
  const deleteSelectedPlace = (_id: string) => {
    const filtered = selectedPlaces.filter((place) => place.id !== _id);
    setSelectedPlaces(filtered);
  };

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
    dataReset();
  };

  /** 데이터 초기화 */
  const dataReset = () => {
    setSearchPlace('');
    setSubmitSearch('');
    setPlaceList([]);
    setSelectedPlaces([]);
    setClickPlaceData(undefined);
  };

  const clickedPlace = useMemo(() => {
    return clickPlaceData ? [clickPlaceData] : [];
  }, [clickPlaceData]);

  /** 장소 추가 핸들링 */
  const handelAddPlace = () => {
    if (!selectedDay) return;

    try {
      setAddScheduleList({
        type: 'place',
        day: selectedDay,
        places: selectedPlaces,
      });
    } catch (error) {
      console.log(error);
    }

    onClickCloseBtn();
    toast.success('장소를 추가했어요');
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
          <Button disabled={!selectedPlaces.length} onClick={handelAddPlace}>
            장소 추가
          </Button>
        </>
      }
    >
      <div className="flex h-full flex-col gap-2">
        <Selectbox
          label="여행 일정 선택"
          options={travelDaysList}
          value={selectedDay}
          onChange={(value) => setSelectedDay(value)}
          placeholder="여행 일정을 선택해주세요"
          isRequired
        />
        <Input
          label="장소 검색"
          placeholder="가고싶은 장소를 찾아보세요"
          isRequired
          onChange={(e) => setSearchPlace(e.target.value)}
          value={searchPlace}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === 'Enter') handleSearch();
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
        />
        <div className="max-mobile:h-40 h-60 overflow-hidden rounded-lg">
          <GoogleMap
            places={clickedPlace}
            id={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID2 as string}
          />
        </div>
        <div className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-auto">
          {placeList.length ? (
            placeList.map((list) => (
              <div
                key={list.id}
                className="flex items-center justify-between gap-1"
              >
                <div
                  className="flex w-full cursor-pointer flex-col"
                  onClick={() => setClickPlaceData(list)}
                >
                  <p className="text-lg">{list.name}</p>
                  <span className="text-text-secondary text-sm">
                    {list.address}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {<>{getPlaceCategory(list.types)}</>}
                    {list.country.name && (
                      <>&nbsp;&#8226;&nbsp;{list.country.name}</>
                    )}
                  </span>
                </div>
                <div className="shrink-0">
                  {selectedPlaces.find((city) => city.id === list.id) ? (
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
        <SelectedChips
          title="선택된 장소"
          selectedList={selectedPlaces}
          onChipClick={deleteSelectedPlace}
        />
      </div>
    </SideModal>
  );
}
