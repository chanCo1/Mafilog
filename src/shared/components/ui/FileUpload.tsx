/**
 * @file: FileUpload.tsx
 * @author: chad
 * @since: 2026.04.26 ~
 * @description: FileUpload 컴포넌트
 */

import {
  ChangeEvent,
  useMemo,
  useRef,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { cn } from '@/shared/lib/utils';
import { SINGLE_COUNT, MULTIPLE_COUNT } from '@/shared/constants';
import RequireDot from '@/shared/components/ui/RequireDot';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/Button';

interface IFileUpload {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
  isMultiple?: boolean;
  disabled?: boolean;
  maxSize?: number;
  accept?: string;
  selectedImage: File[];
  setSelectedImage: Dispatch<SetStateAction<File[]>>;
}

export default function FileUpload({
  className,
  description,
  errorMsg,
  isRequired,
  label,
  labelPosition,
  isMultiple,
  disabled,
  maxSize = 10, // 기본 10MB
  accept = 'image/jpeg,image/jpg,image/png,image/gif',
  selectedImage,
  setSelectedImage,
}: IFileUpload) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  const isDisabled = useMemo(() => {
    if (isMultiple) {
      return disabled || selectedImage.length === MULTIPLE_COUNT;
    }

    return disabled || selectedImage.length === SINGLE_COUNT;
  }, [selectedImage]);

  /** 파일업로드 인풋 클릭 */
  const onClickFileSelect = () => {
    if (!inputRef.current || isDisabled) return;
    inputRef.current.click();
  };

  /** 파일 선택 핸들링 */
  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const _targetFiles = e.target.files;
    if (!_targetFiles || isDisabled) return;
    if (
      _targetFiles.length > MULTIPLE_COUNT ||
      selectedImage.length + _targetFiles.length > MULTIPLE_COUNT
    ) {
      toast.error('이미지는 10개까지 선택할 수 있습니다');
      return;
    }

    const _selectedImages = Array.from(_targetFiles || []);

    // 기존 파일들의 고유 키 생성
    const existingKeys = new Set(
      selectedImage.map((f) => `${f.name}-${f.size}-${f.lastModified}`),
    );

    // 기존과 중복되는지 필터링
    const newFiles = _selectedImages.filter((f) => {
      const key = `${f.name}-${f.size}-${f.lastModified}`;
      return !existingKeys.has(key);
    });

    setSelectedImage((prev) => {
      return [...prev, ...newFiles];
    });

    // 선택 초기화
    e.target.value = '';
  };

  /** 파일 제거 핸들링 */
  const hanldeDeleteFile = (index: number) => {
    const newFiles = selectedImage.filter((_, i) => i !== index);

    setSelectedImage(newFiles);
  };

  /** 이미지 선택에 따라 미리보기 이미지 생성/제거 */
  useEffect(() => {
    const _previews = selectedImage.map((file) => URL.createObjectURL(file));
    setPreviewImage(_previews);

    // 이전 URL들을 메모리에서 해제
    return () => {
      _previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImage]);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <div className="flex min-w-25 items-center gap-1">
          <span>{label}</span>
          {isRequired && <RequireDot />}
        </div>
      )}
      <div className="flex items-end gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={isMultiple}
          onChange={handleSelectFile}
          disabled={disabled}
          className="hidden"
        />
        <div className="relative h-40 w-full">
          {previewImage.length ? (
            <div className="relative h-full">
              {/* 0번 인덱스를 대표 이미지로 지정 */}
              <Image
                src={previewImage[0]}
                alt="대표 이미지 미리보기"
                fill
                className="rounded-lg object-cover"
              />
              <div className="absolute flex w-full justify-between p-2">
                <div className="bg-gray-8 rounded-md px-2 py-1 text-sm text-white">
                  대표
                </div>
                <CategoryIcon
                  variant="x"
                  size="sm"
                  className="bg-gray-8 cursor-pointer border-none text-white"
                  onClick={() => hanldeDeleteFile(0)}
                />
              </div>
            </div>
          ) : (
            <div className="border-border-primary flex h-full items-center justify-center rounded-lg border border-dashed">
              <span className="text-text-secondary text-sm">
                이미지를 선택해주세요
              </span>
            </div>
          )}
        </div>
        <Button disabled={isDisabled} onClick={onClickFileSelect}>
          <div className="flex flex-col items-center text-white">
            <ImagePlus />
            <span className="text-xs">{`${selectedImage.length}/${isMultiple ? '10' : '1'}`}</span>
          </div>
        </Button>
      </div>
      {selectedImage.length > 1 && (
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pt-2">
          {previewImage.map((image, index) => {
            if (!index) return;
            return (
              <div
                key={`${image}-${index}`}
                className="relative h-20 w-20 shrink-0"
              >
                <Image
                  src={image}
                  fill
                  alt={`이미지 미리보기 ${index + 1}`}
                  className="rounded-lg object-cover"
                />
                <div className="absolute right-0 p-1">
                  <CategoryIcon
                    variant="x"
                    size="sm"
                    className="bg-gray-8 cursor-pointer border-none text-white"
                    onClick={() => hanldeDeleteFile(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {description && (
        <span className="text-text-secondary text-sm">{description}</span>
      )}
    </div>
  );
}
