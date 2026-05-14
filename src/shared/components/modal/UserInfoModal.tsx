/**
 * @file: UserInfoModal.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 유저 정보 햄버거 모달 컴포넌트
 */

import { SideModal } from '@/shared/components/ui/SideModal';
import Separator from '@/shared/components/ui/Separator';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { MYPAGE_LIST } from '@/shared/constants';
import { useRouter } from 'next/navigation';

interface IUserInfoModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function UserInfoModal({ isOpen, handleClose }: IUserInfoModal) {
  const router = useRouter();

  /** 페이지 이동 핸들링 */
  const handelLinkPage = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
    <SideModal
      isOpen={isOpen}
      handleClose={handleClose}
      footer={
        <div className="flex w-full justify-between">
          <Button variant="redOutline">로그아웃</Button>
          <Button variant="gray" onClick={handleClose}>
            닫기
          </Button>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex gap-1">
          <div className="h-24 w-24 rounded-full bg-amber-50" />
          <div className="flex flex-col">
            <span className="text-lg font-bold">{'여행최고'}</span>
            <span className="text-text-secondary">{'test@test.com'}</span>
          </div>
        </div>
        <Separator position="horizontal" />
        <div className="scrollbar-hide flex flex-col gap-4 overflow-auto">
          <div className="flex flex-col gap-1">
            <span className="font-bold">마이페이지</span>
            <Card className="text-text-secondary flex flex-col">
              {MYPAGE_LIST.map((list) => (
                <p
                  className="hover:bg-gray-2 cursor-pointer rounded-lg p-2"
                  onClick={() => handelLinkPage(list.path)}
                >
                  {list.name}
                </p>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </SideModal>
  );
}
