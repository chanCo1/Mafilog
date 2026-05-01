/**
 * @file: AddPlaceModal.tsx
 * @author: chad
 * @since: 2026.04.30 ~
 * @description: AddPlaceModal 컴포넌트, 여행 장소 추가 모달
 */

import { useState, useMemo } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Chip } from '@/shared/components/ui/Chip';
import { Input } from '@/shared/components/ui/Input';
import { Loading } from '@/shared/components/ui/Loading';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { IGetGooglePlaces, IPlaceList } from '@/features/myTravel/interfaces';
import {
  getPlaceCategory,
  getTravelDayOfWeek,
  convertFormattedDate,
  getDay,
} from '@/shared/lib/utils';
import { Selectbox } from '@/shared/components/ui/Selectbox';
import { ILabelValue } from '@/shared/interfaces';
import GoogleMap from '@/shared/components/map/GoogleMap';
import SelectedChips from '@/features/myTravel/components/modal/SelectedChips';
import { useTravelStore } from '@/shared/stores/useTravelStore';

interface IAddPlaceModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function AddPlaceModal({
  isOpen,
  handleClose,
}: IAddPlaceModal) {
  const getTravelInfo = useTravelStore((state) => state.getTravelInfo);
  const travelInfo = getTravelInfo();

  /** 일정 선택 옵션 */
  const travelDaysOptions = () => {
    return getTravelDayOfWeek(travelInfo.from, travelInfo.to)?.map((_day) => {
      return {
        label: `${_day.day}일차 ${convertFormattedDate(_day.date, 'MM월 dd일')} (${getDay(_day.date)})`,
        value: _day.day,
      };
    });
  };

  /** 장소 검색 */
  const [searchPlace, setSearchPlace] = useState<string>('');
  /** 검색된 장소 리스트 */
  const [placeList, setPlaceList] = useState<IPlaceList[]>([]);
  /** 로딩 여부 */
  const [isLoading, setIsLoading] = useState(false);
  /** 장소 선택 */
  const [selectedPlaces, setSelectedPlaces] = useState<IPlaceList[]>([]);
  /** 검색 결과 메시지 */
  const [resultMsg, setResultMsg] = useState('');
  /** 일정 선택 */
  const [selectedDay, setSelectedDay] = useState<ILabelValue>(
    travelDaysOptions()?.[0],
  );
  /** 클릭한 장소 정보 */
  const [clickPlaceData, setClickPlaceData] = useState<IPlaceList>();

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const url = 'https://places.googleapis.com/v1/places:searchText';

  const body = {
    textQuery: `${searchPlace}`,
    languageCode: 'ko',
    regionCode: 'KR',
    maxResultCount: 20,
  };

  /** TODO: 임시 테스트 */
  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY as string,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.addressComponents,places.formattedAddress,places.location,places.types',
        },
        // places.primaryTypeDisplayName
        // places.rating
        // places.userRatingCount
        body: JSON.stringify(body),
      });

      const data: IGetGooglePlaces = await res.json();

      if (data.places?.length) {
        /** 도시 정보 추출 */
        const getPlaceData = data.places.map((place) => {
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
            // rating: place.rating,
            // displayName: place?.primaryTypeDisplayName?.text || '',
            // userRatingCount: place.userRatingCount,
          };
        });

        setPlaceList(getPlaceData);
      } else {
        setPlaceList([]);
        setResultMsg('검색된 장소가 없어요');
      }
    } catch (error) {
      console.error('GeoNames 검색 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    setPlaceList([]);
    setSelectedPlaces([]);
    setSelectedDay(travelDaysOptions()?.[0]);
  };

  const clickedPlace = useMemo(() => {
    return clickPlaceData ? [clickPlaceData] : [];
  }, [clickPlaceData]);

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
          <Button disabled={!selectedPlaces.length} onClick={onClickCloseBtn}>
            장소 추가
          </Button>
        </>
      }
    >
      <div className="flex h-full flex-col gap-2">
        <Selectbox
          label="일정 선택"
          options={travelDaysOptions() ? travelDaysOptions(): []}
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
        <div className="max-mobile:h-40 h-60">
          {/* <GoogleMap places={clickedPlace} /> */}
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
