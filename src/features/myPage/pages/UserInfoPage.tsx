/**
 * @file: UserInfoPage.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 계정 정보 페이지
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { ChevronDown } from 'lucide-react';

export default function UserInfoPage() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">내 계정</h3>
        <span>프로필</span>
        <div className="flex gap-3">
          <div className="relative">
            <div className="h-40 w-40 rounded-full bg-amber-100" />
            <div className="absolute right-0 bottom-0">
              <Button variant="gray" size="xs">
                변경
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              label="이름(아이디)"
              description="최대 10글자 입력 가능해요"
            />
            <Button size="sm">프로필 변경</Button>
          </div>
        </div>
      </div>

      <Input label="이메일" value={'test@test.com'} disabled />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">비밀번호 변경</h3>
        <Input label="현재 비밀번호" />
        <Input label="변경 비밀번호" />
        <Input label="변경 비밀번호 확인" />
        <div className="flex justify-end">
          <Button size="sm">비밀번호 변경</Button>
        </div>
      </div>
    </div>
  );
}
