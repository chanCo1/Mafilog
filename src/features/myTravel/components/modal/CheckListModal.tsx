/**
 * @file: CheckListModal.tsx
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: CheckListModal 컴포넌트, 체크리스트 모달
 */

import { useMemo, useState } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import Dropdown from '@/shared/components/ui/Dropdown';
import { Chip } from '@/shared/components/ui/Chip';
import { Button } from '@/shared/components/ui/Button';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { useTravelCheckListStore } from '@/shared/stores/useTravelCheckListStore';
import { EllipsisVertical } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import CategoryDropdown from '@/features/myTravel/components/modal/checkList/CategoryDropdown';
import EditCategoryName from '@/features/myTravel/components/modal/checkList/EditCategoryName';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import AddCheckListItem from '@/features/myTravel/components/modal/checkList/AddCheckListItem';

interface ICheckListModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function CheckListModal({
  isOpen,
  handleClose,
}: ICheckListModal) {
  const checkList = useTravelCheckListStore((state) => state.checkList);
  const setChangeCategoryStatus = useTravelCheckListStore(
    (state) => state.setChangeCategoryStatus,
  );
  const setAddCategory = useTravelCheckListStore(
    (state) => state.setAddCategory,
  );
  const setDeleteItem = useTravelCheckListStore((state) => state.setDeleteItem);
  const setCheckedItem = useTravelCheckListStore(
    (state) => state.setCheckedItem,
  );

  const [selectedCategory, setSelectedCategory] = useState<string | number>(0);
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);

  /** 카테고리 추가 state */
  const [addCategoryName, setAddCategoryName] = useState('');

  /** 카테고리 추가 */
  const handleAddCategory = () => {
    setAddCategory(addCategoryName);
    setIsOpenAddCategory(false);
    setAddCategoryName('');
  };

  const filteredCheckList = useMemo(() => {
    if (selectedCategory === 0) return checkList;
    return checkList.filter((list) => list.id === selectedCategory);
  }, [checkList, selectedCategory]);

  return (
    <SideModal
      isOpen={isOpen}
      title="체크리스트"
      handleClose={handleClose}
      footer={
        <Button variant="gray" onClick={handleClose}>
          닫기
        </Button>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="scrollbar-hide flex gap-1 overflow-auto">
              <Chip
                variant={selectedCategory === 0 ? 'primary' : 'primaryOutline'}
                onClick={() => setSelectedCategory(0)}
              >
                전체
              </Chip>
              {checkList.map((list, index) => (
                <Chip
                  key={index}
                  variant={
                    selectedCategory === list.id ? 'primary' : 'primaryOutline'
                  }
                  onClick={() => setSelectedCategory(list.id)}
                >
                  {list.label}
                </Chip>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOpenAddCategory(true)}
            >
              카테고리 추가
            </Button>
          </div>
          {isOpenAddCategory ? (
            <div className="flex justify-between gap-1">
              <Input
                size="sm"
                value={addCategoryName}
                onChange={(e) => setAddCategoryName(e.target.value)}
                placeholder="카테고리 추가.."
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === 'Enter') handleAddCategory();
                }}
              />
              <Button size="xs" onClick={handleAddCategory}>
                추가
              </Button>
              <Button
                size="xs"
                variant="gray"
                onClick={() => setIsOpenAddCategory(false)}
              >
                취소
              </Button>
            </div>
          ) : null}
        </div>
        <div className="scrollbar-hide flex flex-1 flex-col gap-4 overflow-auto">
          {filteredCheckList.map((list, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                {list.status === 'editCategory' ? (
                  <EditCategoryName list={list} />
                ) : (
                  <p className="font-bold">{list.label}</p>
                )}
                {list.status !== 'editCategory' && (
                  <Dropdown
                    trigger={
                      <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                    }
                  >
                    <CategoryDropdown target={list} />
                  </Dropdown>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {list.list.map((_list, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      value={_list.isChecked}
                      checkboxLabel={_list.label}
                      onChange={() => setCheckedItem(list, _list)}
                    />
                    <div
                      className="text-state-error cursor-pointer text-sm font-bold"
                      onClick={() => setDeleteItem(list, _list)}
                    >
                      삭제
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1">
                  <CategoryIcon
                    variant="plus"
                    size="sm"
                    circled={list.status === 'addItem' ? 'none' : 'outline'}
                    className={
                      list.status === 'addItem' ? 'none' : 'cursor-pointer'
                    }
                    onClick={() => setChangeCategoryStatus(list, 'addItem')}
                  />
                  {list.status === 'addItem' && (
                    <AddCheckListItem list={list} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SideModal>
  );
}
