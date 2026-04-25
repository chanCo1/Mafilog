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
  TRAVEL_COMPANION_LIST,
  TRAVEL_STYLE_LIST,
} from '@/features/myTravel/constants';
import { ILabelValue } from '@/shared/interfaces';

interface ICreateNewTravelStep3 {
  title: string;
  travelConpanion: string;
  setTravelCompanion: Dispatch<SetStateAction<string>>;
  travelStyle: string[];
  setTravelStyle: Dispatch<SetStateAction<string[]>>;
}

export default function CreateNewTravelStep3({
  title,
  setTravelCompanion,
  setTravelStyle,
  travelConpanion,
  travelStyle,
}: ICreateNewTravelStep3) {
  console.log(' >> ', travelConpanion);
  return (
    <div className="flex flex-col gap-3">
      <Input
        label="제목 입력"
        placeholder="여행 제목을 입력해주세요"
        description="필수는 아니에요. 최대 20자까지 입력가능해요"
        maxLength={20}
        value={title}
      />

      <FileUpload label="대표 이미지" description="필수는 아니에요" />

      <div className="flex flex-col gap-1">
        <span>누구와 여행인가요?</span>
        <div className="flex flex-wrap gap-1 p-1">
          {TRAVEL_COMPANION_LIST.map((list) => (
            <Chip
              key={list.value}
              variant={
                list.value == travelConpanion
                  ? 'primary'
                  : 'primaryOutline'
              }
              onClick={() => setTravelCompanion(list.value)}
            >
              {list.label}
            </Chip>
          ))}
        </div>
        <span className="text-text-secondary text-sm">1개만 선택 가능해요</span>
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
              onClick={() => setTravelStyle([...travelStyle, list.value])}
            >
              {list.label}
            </Chip>
          ))}
        </div>
        <span className="text-text-secondary text-sm">
          여러개 선택 가능해요
        </span>
      </div>
    </div>
  );
}
