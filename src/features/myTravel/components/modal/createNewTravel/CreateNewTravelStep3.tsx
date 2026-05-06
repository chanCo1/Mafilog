/**
 * @file: CreateNewTravelStep3.tsx
 * @author: chad
 * @since: 2026.04.26 ~
 * @description: CreateNewTravelStep3 컴포넌트, 여행 정보 입력
 */

import { Dispatch, SetStateAction, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import FileUpload from '@/shared/components/ui/FileUpload';
import { Chip } from '@/shared/components/ui/Chip';
import {
  TRAVEL_PARTNER_LIST,
  TRAVEL_STYLE_LIST,
} from '@/features/myTravel/constants';
import RequireDot from '@/shared/components/ui/RequireDot';

interface ICreateNewTravelStep3 {
  title: string;
  setTravelTitle: Dispatch<SetStateAction<string>>;
  selectedImage: File[];
  setSelectedImage: Dispatch<SetStateAction<File[]>>;
  travelCompanion: string;
  setTravelCompanion: Dispatch<SetStateAction<string>>;
  travelStyle: string[];
  setTravelStyle: Dispatch<SetStateAction<string[]>>;
}

export default function CreateNewTravelStep3({
  title,
  setTravelTitle,
  selectedImage,
  setSelectedImage,
  travelCompanion,
  setTravelCompanion,
  travelStyle,
  setTravelStyle,
}: ICreateNewTravelStep3) {
  /** 여행 스타일 핸들링 */
  const handleTravelStyle = (value: string) => {
    const isChecked = travelStyle.some((_value) => _value === value);

    if (isChecked) {
      setTravelStyle(travelStyle.filter((_value) => _value !== value));
    } else {
      setTravelStyle([...travelStyle, value]);
    }
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-auto">
        <Input
          label="제목 입력"
          placeholder="여행 제목을 입력해주세요"
          description="필수는 아니에요. 최대 20자까지 입력가능해요."
          maxLength={20}
          value={title}
          onChange={(e) => setTravelTitle(e.target.value)}
        />

        <FileUpload
          label="대표 이미지"
          description="필수는 아니에요."
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <div className="flex flex-col gap-1">
          <div className="flex min-w-25 items-center gap-1">
            <span>누구와 여행인가요?</span>
            <RequireDot />
          </div>
          <div className="flex flex-wrap gap-1 p-1">
            {TRAVEL_PARTNER_LIST.map((list) => (
              <Chip
                key={list.value}
                variant={
                  list.value == travelCompanion ? 'primary' : 'primaryOutline'
                }
                onClick={() => setTravelCompanion(list.value)}
              >
                {list.label}
              </Chip>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            1개만 선택 가능해요.
          </span>
        </div>

        <div className="flex flex-col gap-1 p-1">
          <span>어떤 여행인가요?</span>
          <div className="flex flex-wrap gap-1">
            {TRAVEL_STYLE_LIST.map((list) => (
              <Chip
                key={list.value}
                variant={
                  travelStyle.find((style) => style === list.value)
                    ? 'primary'
                    : 'primaryOutline'
                }
                onClick={() => handleTravelStyle(list.value)}
              >
                {list.label}
              </Chip>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            여러개 선택 가능해요.
          </span>
        </div>
      </div>
    </div>
  );
}
