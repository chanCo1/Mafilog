/**
 * @file: FillMemoryStep3.tsx
 * @author: chad
 * @since: 2026.05.15 ~
 * @description: 추억 정보 컴포넌트
 */

import { Dispatch, SetStateAction } from 'react';
import FileUpload from '@/shared/components/ui/FileUpload';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import ColorPicker from '@/shared/components/ui/ColorPicker';
import { cn } from '@/shared/lib/utils';

interface IFillMemoryStep3 {
  selectedImage: (File | string)[];
  setSelectedImage: Dispatch<SetStateAction<(File | string)[]>>;
  memoryTitle: string;
  setMemoryTitle: Dispatch<SetStateAction<string>>;
  memoryMemo: string;
  setMemoryMemo: Dispatch<SetStateAction<string>>;
  mapColor: string;
  setMapColor: Dispatch<SetStateAction<string>>;
}

export default function FillMemoryStep3({
  selectedImage,
  setSelectedImage,
  memoryTitle,
  setMemoryTitle,
  memoryMemo,
  setMemoryMemo,
  mapColor,
  setMapColor,
}: IFillMemoryStep3) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="scrollbar-hide flex flex-1 flex-col gap-5 overflow-auto">
        <Input
          label="제목"
          isRequired
          placeholder="추억 제목을 입력해주세요"
          description="최대 20자까지 입력가능해요"
          maxLength={20}
          value={memoryTitle}
          onChange={(e) => setMemoryTitle(e.target.value)}
        />
        <Textarea
          label="메모"
          maxLength={100}
          value={memoryMemo}
          onChange={(e) => setMemoryMemo(e.target.value)}
        />
        <FileUpload
          label="추억 사진"
          description="필수는 아니에요"
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isMultiple
        />
        <div className="flex flex-col gap-2">
          <span>크레파스</span>
          <div className="flex gap-2">
            <ColorPicker
              value={mapColor}
              onChange={(color) => setMapColor(color)}
            />
            <div className='w-20 flex flex-col gap-1'>
              <div
                className={cn(
                  'border-border-secondary h-full rounded-lg border',
                )}
                style={{ backgroundColor: mapColor }}
              />
              <span className="text-text-secondary text-xs uppercase text-center">
                {mapColor}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
