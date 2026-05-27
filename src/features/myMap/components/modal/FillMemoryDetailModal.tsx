/**
 * @file: FillMemoryDetailModal.tsx
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 추억 상세 모달
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/Button';
import { SideModal } from '@/shared/components/ui/SideModal';
import { useDialogStore } from '@/shared/stores/useDialogStore';

interface IFillMemoryDetailModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function FillMemoryDetailModal({
  handleClose,
  isOpen,
}: IFillMemoryDetailModal) {
  const { openDialog } = useDialogStore();

  /** 닫기 버튼 클릭 */
  const onClickCloseBtn = () => {
    handleClose();
  };

  /** 여행 삭제 */
  const handelDeleteMemory = () => {
    openDialog({
      type: 'confirm',
      message: '추억을 삭제할까요?',
      okLabel: '삭제',
      // onOk: async () => {
      //   await deleteMyTravel(travelId);
      //   router.push('/my-travel');
      // },
    });
  };

  return (
    <SideModal
      isOpen={isOpen}
      title="상세"
      handleClose={onClickCloseBtn}
      footer={
        <div className={cn('flex w-full justify-between gap-1')}>
          <Button variant="redOutline" onClick={handelDeleteMemory}>
            삭제
          </Button>
          <div className="flex gap-1">
            <Button variant="gray" onClick={onClickCloseBtn}>
              닫기
            </Button>
            <Button
            // disabled={!selectedCities.length}
            // onClick={handelNextStep}
            >
              수정
            </Button>
          </div>
        </div>
      }
    >
      <div>FillMemoryDetailModal</div>
    </SideModal>
  );
}
