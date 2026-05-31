/**
 * @file: AddCheckListItem.tsx
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: 체크리스트 > 아이템 추가 컴포넌트
 */

import { useState } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { IChecklistResponse } from '@/features/myTravel/interfaces/checklist.interface';
import { TChecklistStatusType } from '@/features/myTravel/types/checklist.type';
import { useCreateChecklist } from '@/features/myTravel/hooks/rquery/checklist/useCreateChecklist';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';

interface IAddCheckListItem {
  list: IChecklistResponse;
  changeStatus: (id: number, status: TChecklistStatusType) => void;
}

export default function AddCheckListItem({
  list,
  changeStatus,
}: IAddCheckListItem) {
  const [addItemName, setAddItemName] = useState('');
  const travelId = useGetTravelId();
  const { mutate: addChecklistItem } = useCreateChecklist(travelId);

  /** 체크리스트 아이템 추가 */
  const handleAddItem = () => {
    addChecklistItem({
      travelId,
      requestData: {
        type: 'ITEM',
        label: addItemName,
        categoryId: list.id,
      },
    });
    setAddItemName('');
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <Input
        size="sm"
        value={addItemName}
        maxLength={15}
        onChange={(e) => setAddItemName(e.target.value)}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === 'Enter') handleAddItem();
        }}
      />
      <div className="flex shrink-0 gap-3">
        <div
          className="text-primary cursor-pointer font-bold"
          onClick={handleAddItem}
        >
          추가
        </div>
        <div
          className="text-text-secondary cursor-pointer font-bold"
          onClick={() => changeStatus(list.id, null)}
        >
          취소
        </div>
      </div>
    </div>
  );
}
