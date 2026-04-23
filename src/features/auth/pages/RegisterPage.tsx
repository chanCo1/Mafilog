/**
 * @file: RegisterPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: RegisterPage 컴포넌트, 회원가입 페이지
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import PageTemplate from '@/features/auth/components/PageTemplate';
import { Button } from '@/shared/components/ui/Button';

interface IRegisterPage {}

export default function RegisterPage() {
  return (
    <PageTemplate title="회원가입" backBtnLabel="로그인" path="/login">
      <div className="flex flex-col gap-3">
        <Input
          label="이메일"
          isRequired
          placeholder="이메일을 입력해주세요"
          errorMsg=""
          description="example@example.com"
        />
        <Input
          label="이름(아이디)"
          isRequired
          placeholder="이름(아이디)를 입력해주세요"
          errorMsg=""
          description="한글, 영문, 숫자, 최대 10글자 입력 가능"
        />
        <Input
          label="비밀번호"
          isRequired
          placeholder="비밀번호를 입력해주세요"
          errorMsg=""
          description="영문 + 숫자 + 특수문자 조합"
        />
        <Input
          label="비밀번호 확인"
          isRequired
          placeholder="비밀번호를 다시 입력해주세요"
          errorMsg=""
        />
      </div>
      <Button className="mt-4 w-full" size="lg">
        회원가입
      </Button>
    </PageTemplate>
  );
}
