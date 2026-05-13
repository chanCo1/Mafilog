/**
 * @file: UserInfoModal.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: UserInfoModal 컴포넌트
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { SideModal } from '@/shared/components/ui/SideModal';
import Separator from '@/shared/components/ui/Separator';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';

interface IUserInfoModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function UserInfoModal({ isOpen, handleClose }: IUserInfoModal) {
  return (
    <SideModal
      isOpen={isOpen}
      title=""
      handleClose={handleClose}
      footer={
        <div className="flex justify-start w-full">
          <Button variant="redOutline" size="sm">
            로그아웃
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <div className='flex gap-1'>
          <div className='w-20 h-20 rounded-full bg-amber-50'></div>
          <div className='flex flex-col'>
            <span className='text-lg font-bold'>여행최고</span>
            <span className='text-text-secondary'>test@test.com</span>
          </div>
        </div>
        <Separator position="horizontal" />
        <div className="flex flex-col gap-1">
          <span className="font-bold">마이페이지</span>
          <Card className="text-text-secondary flex flex-col gap-3">
            <span className='cursor-pointer'>계정 정보</span>
            <span className='cursor-pointer'>내 타임라인</span>
          </Card>
        </div>
      </div>
    </SideModal>
  );
}
