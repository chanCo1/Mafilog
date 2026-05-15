/**
 * @file: CreateNewTravelStep1.tsx
 * @author: chad
 * @since: 2026.04.25 ~
 * @description: CreateNewTravelStep1 컴포넌트, 새 여행 만들기 - 여행지 선택
 */

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Chip } from '@/shared/components/ui/Chip';
import { Input } from '@/shared/components/ui/Input';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { Search, Plane, Bus } from 'lucide-react';
import { Loading } from '@/shared/components/ui/Loading';
import SelectedChips from '@/features/myTravel/components/modal/SelectedChips';
import { useCountriesDataStore } from '@/shared/stores/useCountriesDataStore';
import tzlookup from 'tz-lookup';
import { useFetchGooglePlaces } from '@/shared/hooks/rquery/useFetchGooglePlaces';
import { TRAVEL_TYPE_LIST } from '@/features/myTravel/constants';
import { TRAVEL_TYPE } from '@/shared/types/Enum';

interface ICreateNewTravelStep1 {
  travelType: string;
  setTravelType: Dispatch<SetStateAction<string>>;
  selectedCities: IPlaceList[];
  setSelectedCities: Dispatch<SetStateAction<IPlaceList[]>>;
}

export default function CreateNewTravelStep1({
  travelType,
  setTravelType,
  selectedCities,
  setSelectedCities,
}: ICreateNewTravelStep1) {
  const { countryData } = useCountriesDataStore();

  const [searchCity, setSearchCity] = useState<string>('');
  const [cityList, setCityList] = useState<IPlaceList[]>([]);
  const [resultMsg, setResultMsg] = useState('');

  const [submitSearch, setSubmitSearch] = useState<string>('');
  const { data: searchData, isLoading } = useFetchGooglePlaces({
    search: submitSearch,
  });

  const handleSearch = async () => {
    try {
      // 검색 전 초기화 한번 진행
      setSubmitSearch('');
      setSubmitSearch(searchCity);
    } catch (error) {
      console.error('GooglePlaces 검색 에러:', error);
    }
  };

  useEffect(() => {
    if (searchData?.places?.length) {
      /** 도시 필터링 */
      const filteredCities = searchData.places.filter((place) =>
        ['locality', 'administrative_area_level_1'].some((value) =>
          place.types.includes(value),
        ),
      );

      /** 도시 정보 추출 */
      const getCityData = filteredCities.map((place) => {
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
          timezone: tzlookup(place.location.latitude, place.location.longitude),
        };
      });

      setCityList(getCityData);
    } else {
      setCityList([]);
      setResultMsg('검색된 도시가 없어요');
    }
  }, [searchData]);

  /** 도시 선택 */
  const selectCity = (list: IPlaceList) => {
    setSelectedCities([...selectedCities, list]);
    setSearchCity('');
  };

  /** 선택한 도시 제거 */
  const deleteSelectedCity = (_id: string) => {
    const filtered = selectedCities.filter((city) => city.id !== _id);
    setSelectedCities(filtered);
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span>어디로 가는 여행인가요?</span>
        <div className="flex gap-1">
          {TRAVEL_TYPE_LIST.map((list) => (
            <Chip
              key={list.value}
              variant={travelType === list.value ? 'primary' : 'primaryOutline'}
              onClick={() => setTravelType(list.value)}
              prefix={
                list.value === TRAVEL_TYPE.WORLD ? (
                  <Plane size={16} />
                ) : (
                  <Bus size={16} />
                )
              }
            >
              {list.label}
            </Chip>
          ))}
        </div>
      </div>
      <Input
        label="도시 검색"
        isRequired
        onChange={(e) => setSearchCity(e.target.value)}
        value={searchCity}
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
        description="여행하고 싶은 도시를 검색해주세요."
      />
      <div className="scrollbar-hide flex h-full flex-col gap-2 overflow-auto">
        {cityList.length ? (
          cityList.map((list) => (
            <div
              key={list.id}
              className="flex items-center justify-between gap-1"
            >
              <div className="flex flex-col">
                <p className="text-lg">{list.name}</p>
                <span className="text-text-secondary text-sm">
                  {list.address}
                </span>
                <div className="flex items-center gap-1">
                  {list.country.code && (
                    <div>{countryData[list.country.code].flagEmoji}</div>
                  )}
                  <span className="text-text-secondary text-sm">
                    {list.country.name && <>{list.country.name}</>}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                {selectedCities.find((city) => city.id === list.id) ? (
                  <Chip
                    variant="redOutline"
                    onClick={() => deleteSelectedCity(list.id)}
                  >
                    취소
                  </Chip>
                ) : (
                  <Chip variant="gray" onClick={() => selectCity(list)}>
                    선택
                  </Chip>
                )}
              </div>
            </div>
          ))
        ) : (
          <>
            {!cityList.length && resultMsg ? (
              <span className="text-text-secondary">{resultMsg}</span>
            ) : null}
          </>
        )}
      </div>
      <SelectedChips
        title="선택된 도시"
        selectedList={selectedCities}
        onChipClick={deleteSelectedCity}
      />
    </div>
  );
}
