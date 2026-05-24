/**
 * @file: EditCategoryName.tsx
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: 카테고리 수정 컴포넌트
 */

import { useState } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { IChecklistResponse } from '@/features/myTravel/interfaces/checklist.interface';
import { TChecklistStatusType } from '@/features/myTravel/types/checklist.type';
import { useUpdateChecklist } from '@/features/myTravel/hooks/rquery/checklist/useUpdateChecklist';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';

interface IEditCategoryName {
  target: IChecklistResponse;
  changeStatus: (id: number, status: TChecklistStatusType) => void;
}

export default function EditCategoryName({
  target,
  changeStatus,
}: IEditCategoryName) {
  const [categoryName, setCategoryName] = useState(target.label);

  const travelId = useGetTravelId();
  const { mutate: updateCategory } = useUpdateChecklist(travelId);

  /** 카테고리명 수정 */
  const handleUpdateCategoryName = () => {
    updateCategory({
      travelId,
      requestData: {
        type: 'CATEGORY',
        categoryId: target.id,
        label: target.label,
      },
    });
  };

  return (
    <div className="flex w-full gap-1">
      <Input
        size="sm"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Button
        size="xs"
        disabled={!categoryName}
        onClick={handleUpdateCategoryName}
      >
        수정
      </Button>
      <Button
        size="xs"
        variant="gray"
        onClick={() => changeStatus(target.id, null)}
      >
        취소
      </Button>
    </div>
  );
}
