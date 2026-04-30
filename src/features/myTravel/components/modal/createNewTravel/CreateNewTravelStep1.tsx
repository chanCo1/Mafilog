/**
 * @file: CreateNewTravelStep1.tsx
 * @author: chad
 * @since: 2026.04.25 ~
 * @description: CreateNewTravelStep1 컴포넌트, 새 여행 만들기 - 여행지 선택
 */

import { Dispatch, SetStateAction, useState } from 'react';
import { Chip } from '@/shared/components/ui/Chip';
import { Input } from '@/shared/components/ui/Input';
import { ICityList } from '@/features/myTravel/interfaces';
import { Search, X } from 'lucide-react';
import { CITY_MOCK_DATA } from '@/features/myTravel/data';
import { IGetGooglePlaces } from '@/features/myTravel/interfaces';
import { Loading } from '@/shared/components/ui/Loading';

interface ICreateNewTravelStep1 {
  selectedCities: ICityList[];
  setSelectedCities: Dispatch<SetStateAction<ICityList[]>>;
}

export default function CreateNewTravelStep1({
  selectedCities,
  setSelectedCities,
}: ICreateNewTravelStep1) {
  const [searchCity, setSearchCity] = useState<string>('');
  const [cityList, setCityList] = useState<ICityList[]>([]);
  const [resultMsg, setResultMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const url = 'https://places.googleapis.com/v1/places:searchText';

  const body = {
    textQuery: `${searchCity}`,
    languageCode: 'ko',
    includedType: 'locality',
    maxResultCount: 50,
  };

  // TODO: 테스트
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // const res = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-Goog-Api-Key': GOOGLE_API_KEY as string,
      //     'X-Goog-FieldMask':
      //       'places.displayName,places.formattedAddress,places.location,places.id,places.addressComponents,places.types,places.rating,places.user_ratings_total',
      //   },
      //   body: JSON.stringify(body),
      // });

      // const data: IGetGooglePlaces = await res.json();

      // if (data.places?.length) {
      //   /** 도시 필터링 */
      //   const filteredCities = data.places.filter((place) =>
      //     ['locality', 'administrative_area_level_1'].some((value) =>
      //       place.types.includes(value),
      //     ),
      //   );
      if (CITY_MOCK_DATA.places?.length) {
        /** 도시 필터링 */
        const filteredCities = CITY_MOCK_DATA.places.filter((place) =>
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
            location: place.location,
          };
        });

        setCityList(getCityData);
      } else {
        setCityList([]);
        setResultMsg('검색된 도시가 없어요');
      }
    } catch (error) {
      console.error('GeoNames 검색 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /** 도시 선택 */
  const selectCity = (list: ICityList) => {
    setSelectedCities([...selectedCities, list]);
    setSearchCity('');
  };

  /** 선택한 도시 제거 */
  const deleteSelectedCity = (_id: string) => {
    const filtered = selectedCities.filter((city) => city.id !== _id);
    setSelectedCities(filtered);
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <Input
        label="도시 검색"
        placeholder="도시명으로 검색"
        isRequired
        onChange={(e) => setSearchCity(e.target.value)}
        value={searchCity}
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
        description="여행하고 싶은 도시를 검색해주세요."
      />
      <div className="scrollbar-hide overflow-auto flex-1 flex flex-col gap-2">
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
      <div className="flex flex-col">
        <p className="shrink-0">선택된 장소</p>
        {selectedCities.length ? (
          <div className="scrollbar-hide flex gap-1 overflow-x-auto">
            {selectedCities.map((city) => (
              <Chip
                key={city.id}
                className="shrink-0"
                variant="gray"
                suffix={<X className="h-4 w-4" />}
                onClick={() => deleteSelectedCity(city.id)}
              >
                {city.name}
              </Chip>
            ))}
          </div>
        ) : (
          <span className="text-text-secondary text-sm">
            선택된 장소가 없어요
          </span>
        )}
      </div>
    </div>
  );
}
