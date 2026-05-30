/**
 * @file: CheckListModal.tsx
 * @author: chad
 * @since: 2026.05.04 ~
 * @description: 체크리스트 모달
 */

import { useMemo, useState } from 'react';
import { SideModal } from '@/shared/components/ui/SideModal';
import Dropdown from '@/shared/components/ui/Dropdown';
import { Chip } from '@/shared/components/ui/Chip';
import { Button } from '@/shared/components/ui/Button';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { EllipsisVertical } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import CategoryDropdown from '@/features/myTravel/components/modal/checkList/CategoryDropdown';
import EditCategoryName from '@/features/myTravel/components/modal/checkList/EditCategoryName';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import AddCheckListItem from '@/features/myTravel/components/modal/checkList/AddCheckListItem';
import { useGetTravelId } from '@/features/myTravel/hooks/useGetTravelId';
import { useGetChecklist } from '@/features/myTravel/hooks/rquery/checklist/useGetChecklist';
import { TChecklistStatusType } from '@/features/myTravel/types/checklist.type';
import { useCreateChecklist } from '@/features/myTravel/hooks/rquery/checklist/useCreateChecklist';
import { useDeleteChecklist } from '@/features/myTravel/hooks/rquery/checklist/useDeleteChecklist';
import { useUpdateChecklist } from '@/features/myTravel/hooks/rquery/checklist/useUpdateChecklist';
import ChecklistSkeleton from '@/shared/components/skeleton/ChecklistSkeleton';

interface ICheckListModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function CheckListModal({
  isOpen,
  handleClose,
}: ICheckListModal) {
  const travelId = useGetTravelId();
  const { mutate: createChecklistCategory } = useCreateChecklist(travelId);
  const { mutate: deleteChecklistItem } = useDeleteChecklist(travelId);
  const { mutate: updateChecklistItem } = useUpdateChecklist(travelId);

  const { data: checklist, isLoading } = useGetChecklist(travelId, isOpen);
  const [editStatus, setEditStatus] = useState<
    Record<number, TChecklistStatusType>
  >({});

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);

  /** 추가할 카테고리 이름 */
  const [addCategoryName, setAddCategoryName] = useState('');

  /** 카테고리 추가 핸들링 */
  const handleAddCategory = () => {
    createChecklistCategory({
      travelId,
      requestData: {
        type: 'CATEGORY',
        label: addCategoryName,
      },
    });
    setIsOpenAddCategory(false);
    setAddCategoryName('');
  };

  const filteredCheckList = useMemo(() => {
    if (selectedCategory === 0) return checklist;
    return checklist?.filter((list) => list.id === selectedCategory);
  }, [checklist, selectedCategory]);

  const changeStatus = (id: number, status: TChecklistStatusType) => {
    setEditStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

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
              {checklist?.map((list, index) => (
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
          {isOpenAddCategory && (
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
                maxLength={15}
              />
              <Button
                size="xs"
                disabled={!addCategoryName}
                onClick={handleAddCategory}
              >
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
          )}
        </div>
        <div className="scrollbar-hide flex flex-1 flex-col gap-4 overflow-auto">
          {isLoading && <ChecklistSkeleton />}

          {!isLoading && filteredCheckList?.map((list, index) => {
            const currentStatus = editStatus[list.id] || null;

            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  {currentStatus === 'editCategory' ? (
                    <EditCategoryName
                      target={list}
                      changeStatus={changeStatus}
                    />
                  ) : (
                    <p className="font-bold">{list.label}</p>
                  )}
                  {currentStatus !== 'editCategory' && (
                    <Dropdown
                      trigger={
                        <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                      }
                    >
                      <CategoryDropdown
                        list={list}
                        changeStatus={changeStatus}
                      />
                    </Dropdown>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {list.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox
                        value={item.isChecked}
                        checkboxLabel={item.label}
                        isCheckList={item.isChecked}
                        onChange={() =>
                          updateChecklistItem({
                            travelId,
                            requestData: {
                              type: 'ITEM',
                              categoryId: list.id,
                              itemId: item.id,
                              isChecked: !item.isChecked,
                            },
                          })
                        }
                      />
                      <div
                        className="text-state-error cursor-pointer text-sm font-bold"
                        onClick={() =>
                          deleteChecklistItem({
                            travelId,
                            requestData: {
                              type: 'ITEM',
                              categoryId: list.id,
                              itemId: item.id,
                            },
                          })
                        }
                      >
                        삭제
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-1">
                    <CategoryIcon
                      variant="plus"
                      size="sm"
                      circled={currentStatus === 'addItem' ? 'none' : 'outline'}
                      className={
                        currentStatus === 'addItem' ? 'none' : 'cursor-pointer'
                      }
                      onClick={() => changeStatus(list.id, 'addItem')}
                    />
                    {currentStatus === 'addItem' && (
                      <AddCheckListItem
                        list={list}
                        changeStatus={changeStatus}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SideModal>
  );
}
