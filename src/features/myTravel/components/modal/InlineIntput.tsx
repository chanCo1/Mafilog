/**
 * @file: InlineInput.tsx
 * @author: chad
 * @since: 2026.05.24 ~
 * @description: 모달안에 작은 인풋 컴포넌트
 */

import { useState } from 'react';
import { Input } from '@/shared/components/ui/Input';

interface InlineInputProps {
  defaultValue?: string;
  submitText?: '추가' | '수정';
  onSubmit: (value: string) => void;
  onCancel: () => void;
  placeholder?: string;
  maxLength?: number;
}

export default function InlineInput({
  defaultValue = '',
  submitText = '추가',
  onSubmit,
  onCancel,
  placeholder = '',
  maxLength = 10,
}: InlineInputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleSubmit = () => {
    if (!inputValue) return; 
    onSubmit(inputValue);    
    setInputValue('');
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <Input
        size="sm"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === 'Enter') handleSubmit();
        }}
      />
      
      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          className="text-primary cursor-pointer font-bold hover:opacity-80"
          onClick={handleSubmit}
        >
          {submitText}
        </button>
        <button
          type="button"
          className="text-text-secondary cursor-pointer font-bold hover:opacity-80"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}