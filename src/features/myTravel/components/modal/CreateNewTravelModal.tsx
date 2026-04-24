/**
 * @file: CreateNewTravelModal.tsx
 * @author: chad
 * @since: 2026.04.24 ~
 * @description: CreateNewTravelModal 컴포넌트, 새 여행 만들기 모달
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { SideModal } from '@/shared/components/ui/SideModal';
import { Button } from '@/shared/components/ui/Button';
import { Chip } from '@/shared/components/ui/Chip';
import { Input } from '@/shared/components/ui/Input';
import Step from '@/shared/components/ui/Step';
import { Search } from 'lucide-react';

interface ICreateNewTravelModal {
  isOpen: boolean;
  handleClose: () => void;
}

const mock_data = [
  { label: '여행지 선택', isComplete: false },
  { label: '날짜 선택', isComplete: false },
  { label: '여행 정보', isComplete: false },
];

export default function CreateNewTravelModal({
  isOpen,
  handleClose,
}: ICreateNewTravelModal) {
  const [searchCity, setSearchCity] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [cityList, setCityList] = useState([]);

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
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY as string,
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.location,places.id,places.addressComponents,places.types',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.places?.length) {
        /** 도시 필터링 */
        const filteredCities = data.places?.filter((place: any) =>
          ['locality', 'administrative_area_level_1'].some((v) =>
            place.types.includes(v),
          ),
        );

        /** 도시 정보 추출 */
        const getCityData = filteredCities.map((place: any) => {
          const getCountryCode = place.addressComponents?.find((c: any) =>
            c.types.includes('country'),
          );

          const country = {
            name: getCountryCode?.longText,
            code: getCountryCode?.shortText,
          };

          return {
            id: place.id,
            name: place.displayName.text,
            address: place.formattedAddress,
            country: country,
            location: place.location,
          };
        });

        setCityList(getCityData);
      } else {
        setCityList([]);
      }
    } catch (error) {
      console.error('GeoNames 검색 에러:', error);
    }
  };

  return (
    <SideModal
      isOpen={isOpen}
      title="새 여행 만들기"
      handleClose={handleClose}
      footer={
        <>
          <Button variant="gray" onClick={handleClose}>
            취소
          </Button>
          <Button>다음</Button>
        </>
      }
    >
      <Step
        stepOptions={mock_data}
        currentStep={currentStep}
        onClickStep={setCurrentStep}
      />
      <Input
        label="도시 검색"
        placeholder="도시명을 검색해주세요"
        isRequired
        onChange={(e) => setSearchCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          e.key === 'Enter' && handleSearch();
        }}
        suffix={
          <Search className="h-4 w-4 cursor-pointer" onClick={handleSearch} />
        }
      />
      {cityList.length ? (
        cityList.map((list) => (
          <div key={list.id} className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-lg">{list.name}</p>
              <span className="text-text-secondary text-sm">
                {list.address}
              </span>
            </div>
            <Chip variant="gray">선택</Chip>
          </div>
        ))
      ) : (
        <span className='text-text-secondary'>검색된 도시가 없어요</span>
      )}
    </SideModal>
  );
}
