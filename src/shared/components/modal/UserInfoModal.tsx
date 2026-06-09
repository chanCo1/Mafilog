/**
 * @file: UserInfoModal.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 유저 정보 햄버거 모달 컴포넌트
 */

import { SideModal } from '@/shared/components/ui/SideModal';
import { cn } from '@/shared/lib/utils';
import Separator from '@/shared/components/ui/Separator';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { MYPAGE_LIST } from '@/shared/constants';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
interface IUserInfoModal {
  isOpen: boolean;
  handleClose: () => void;
}

export default function UserInfoModal({ isOpen, handleClose }: IUserInfoModal) {
  const router = useRouter();
  const { data: userData } = useSession();
  const userInfo = userData?.user;

  /** 페이지 이동 핸들링 */
  const handelLinkPage = (path: string) => {
    router.push(path);
    handleClose();
  };

  /** 로그아웃 */
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
    handleClose();
    router.replace('/login');
  };

  return (
    <SideModal
      isOpen={isOpen}
      handleClose={handleClose}
      footer={
        <div className="flex w-full justify-between">
          <Button variant="redOutline" onClick={handleLogout}>
            로그아웃
          </Button>
          <Button variant="gray" onClick={handleClose}>
            닫기
          </Button>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-5">
        {userInfo && (
          <div className="flex gap-1">
            <div className="h-24 w-24">
              {userInfo.profileImageUrl ? (
                <Image
                  src={userInfo.profileImageUrl}
                  alt="프로필 이미지"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div
                  className={cn('h-full w-full rounded-full')}
                  style={{ backgroundColor: `${userInfo?.hexCode}` }}
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold">{userInfo.name}</span>
              <span className="text-text-secondary">{userInfo.email}</span>
            </div>
          </div>
        )}

        <Separator position="horizontal" />

        <div className="tablet:hidden flex flex-col gap-3">
          <span
            className="flex items-center justify-between gap-1 py-1 font-bold"
            onClick={() => handelLinkPage('/my-travel')}
          >
            내 여행
            <ChevronRight size={16} />
          </span>
          <span
            className="flex items-center justify-between gap-1 py-1 font-bold"
            onClick={() => handelLinkPage('/my-map')}
          >
            추억 채우기
            <ChevronRight size={16} />
          </span>
        </div>

        <div className="scrollbar-hide flex flex-col gap-4 overflow-auto">
          <div className="flex flex-col gap-1">
            <span className="font-bold">마이페이지</span>
            <Card className="text-text-secondary flex flex-col">
              {MYPAGE_LIST.map((list, index) => (
                <div
                  key={`${list.name}-${index}`}
                  className="hover:bg-gray-2 flex cursor-pointer items-center gap-1 rounded-lg p-2"
                  onClick={() => handelLinkPage(list.path)}
                >
                  {list.name}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </SideModal>
  );
}
