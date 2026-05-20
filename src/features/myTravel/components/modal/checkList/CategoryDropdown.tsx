/**
 * @file: CategoryDropdown.tsx
 * @author: chad
 * @since: 2026.05.05 ~
 * @description: CategoryDropdown 컴포넌트, 카테고리 더보기 클릭 시 노출 드롭다운 메뉴
 */

import { ReactNode } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { IChecklistResponse } from '@/features/myTravel/interfaces/checklist.interface';
import { TChecklistStatusType } from '@/features/myTravel/types/checklist.type';

interface ICategoryDropdown {
  list: IChecklistResponse;
  changeStatus: (id: number, status: TChecklistStatusType) => void;
}

export default function CategoryDropdown({ list, changeStatus }: ICategoryDropdown) {
  return (
    <div className="flex flex-col gap-2">
      <CategoryDropdownMenu onClick={() => changeStatus(list.id, 'editCategory')}>
        <Pencil className="h-4 w-4" />
        카테고리 수정
      </CategoryDropdownMenu>
      {/* TODO: 카테고리 삭제 해야함 */}
      <CategoryDropdownMenu onClick={() => null}>
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
