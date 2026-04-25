/**
 * @file: FileUpload.tsx
 * @author: chad
 * @since: 2026.04.26 ~
 * @description: FileUpload 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Upload } from 'lucide-react';
import RequireDot from '@/shared/components/ui/RequireDot';

interface IFileUpload {
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'top';
  isRequired?: boolean;
  description?: string;
  errorMsg?: string;
}

export default function FileUpload({
  className,
  description,
  errorMsg,
  isRequired,
  label,
  labelPosition,
}: IFileUpload) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex min-w-25 items-center gap-1">
          <span>{label}</span>
          {isRequired && <RequireDot />}
        </div>
      )}
      <div className="flex h-50 w-full items-center justify-center rounded-lg border border-dashed">
        <Upload className="h-5 w-5" />
      </div>
      {description && (
        <span className="text-text-secondary text-sm">{description}</span>
      )}
    </div>
  );
}
