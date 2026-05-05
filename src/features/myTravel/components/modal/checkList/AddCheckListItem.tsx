/**
 * @file: AddCheckListItem.tsx
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: 체크리스트 > 준비물 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { ICheckList } from '@/shared/interfaces/travelCheckListStore.interface';
import { Input } from '@/shared/components/ui/Input';
import { useTravelCheckListStore } from '@/shared/stores/useTravelCheckListStore';

interface IAddCheckListItem {
  list: ICheckList;
}

export default function AddCheckListItem({ list }: IAddCheckListItem) {
  const setChangeCategoryStatus = useTravelCheckListStore(
    (state) => state.setChangeCategoryStatus,
  );
  const setAddItem = useTravelCheckListStore((state) => state.setAddItem);

  const [addItemName, setAddItemName] = useState('');

  const handleAddItem = () => {
    setAddItem(list, addItemName);
    setChangeCategoryStatus(list, null);
    setAddItemName('');
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <Input
        size="sm"
        value={addItemName}
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
          onClick={() => setChangeCategoryStatus(list, null)}
        >
          취소
        </div>
      </div>
    </div>
  );
}
