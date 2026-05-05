/**
 * @file: EditCategoryName.tsx
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: 카테고리 수정 컴포넌트 
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { ICheckList } from '@/shared/interfaces/travelCheckListStore.interface';
import { useTravelCheckListStore } from '@/shared/stores/useTravelCheckListStore';

interface IEditCategoryName {
  list: ICheckList;
}

export default function EditCategoryName({list}: IEditCategoryName) {
  const setChangeCategoryStatus = useTravelCheckListStore(
    (state) => state.setChangeCategoryStatus,
  );
  const setUpdateCategoryName = useTravelCheckListStore(
    (state) => state.setUpdateCategoryName,
  );

  const [categoryName, setCategoryName] = useState(list.label);

  /** 카테고리명 수정 */
  const handleUpdateCategoryName = (target: ICheckList) => {
    setUpdateCategoryName(target, categoryName);
    setChangeCategoryStatus(target, null);
    setCategoryName('');
  };

  return (
    <div className="flex w-full gap-1">
      <Input
        size="sm"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Button size="xs" onClick={() => handleUpdateCategoryName(list)}>
        수정
      </Button>
      <Button
        size="xs"
        variant="gray"
        onClick={() => setChangeCategoryStatus(list, null)}
      >
        취소
      </Button>
    </div>
  );
}
