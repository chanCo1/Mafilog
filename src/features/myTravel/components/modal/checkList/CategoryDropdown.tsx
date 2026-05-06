/**
 * @file: CategoryDropdown.tsx
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: CategoryDropdown 컴포넌트, 카테고리 더보기 클릭 시 노출 드롭다운 메뉴
 */

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { Pencil, Trash, Plus } from 'lucide-react';
import { useTravelCheckListStore } from '@/shared/stores/useTravelCheckListStore';
import { ICheckList } from '@/shared/interfaces/travelCheckListStore.interface';

interface ICategoryDropdown {
  target: ICheckList;
}

export default function CategoryDropdown({ target }: ICategoryDropdown) {
  const setChangeCategoryStatus = useTravelCheckListStore(
    (state) => state.setChangeCategoryStatus,
  );
  const setDeleteCategory = useTravelCheckListStore(
    (state) => state.setDeleteCategory,
  );

  /** 카테고리 수정 클릭 핸들링 */
  const handleEditCategory = () => {
    setChangeCategoryStatus(target, 'editCategory');
  };

  return (
    <div className="flex flex-col gap-2">
      <CategoryDropdownMenu onClick={handleEditCategory}>
        <Pencil className="h-4 w-4" />
        카테고리 수정
      </CategoryDropdownMenu>
      <CategoryDropdownMenu onClick={() => setDeleteCategory(target)}>
        <Trash className="h-4 w-4" />
        카테고리 삭제
      </CategoryDropdownMenu>
    </div>
  );
}

interface ICategoryDropdownMenu {
  children: ReactNode;
  onClick?: () => void;
}

function CategoryDropdownMenu({ children, onClick }: ICategoryDropdownMenu) {
  return (
    <div
      className="hover:bg-gray-1 flex cursor-pointer items-center gap-2 p-1 text-sm"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
