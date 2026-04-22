'use client';

/**
 * @file: LoginPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: LoginPage 컴포넌트, 로그인 페이지
 */

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import PageTemplate from '@/features/login/components/PageTemplate';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { Button } from '@/shared/components/ui/Button';
import Image from 'next/image';

interface ILoginPage {}

export default function LoginPage() {
  const [saveEmail, setSaveEmail] = useState([{ label: '', value: '' }]);

  return (
    <PageTemplate title="로그인">
      <div className="flex flex-col gap-2">
        <Input
          label="이메일"
          isRequired
          placeholder="이메일을 입력해주세요"
          errorMsg=""
          description="example@example.com"
        />
        <Input
          label="비밀번호"
          isRequired
          placeholder="비밀번호를 입력해주세요"
          errorMsg=""
          description="영문 + 숫자 + 특수문자 조합"
        />
      </div>
      {/* TODO: 체크박스 단일로 사용할 경우도 만들어야할듯... */}
      <Checkbox
        checkOptions={[{ label: '이메일 저장', value: 'yes' }]}
        value={saveEmail}
        onChange={(v) => setSaveEmail(v)}
      />
      <Button className="w-full">로그인</Button>
      <div className="flex flex-col items-center gap-1">
        <span className="text-text-secondary">
          SNS 계정으로 로그인 / 회원가입
        </span>
        <div className="flex gap-4">
          <Image
            src={'/google.jpeg'}
            alt="구글 소셜 로그인 이미지"
            width={36}
            height={36}
            className="rounded-full object-contain cursor-pointer"
          />
          <Image
            src={'/kakao.png'}
            alt="구글 소셜 로그인 이미지"
            width={36}
            height={36}
            className="rounded-full object-contain cursor-pointer"
          />
          <Image
            src={'/naver.png'}
            alt="구글 소셜 로그인 이미지"
            width={36}
            height={36}
            className="rounded-full object-contain cursor-pointer"
          />
        </div>
      </div>
      <div className='flex gap-1 flex-col items-center justify-center'>
        <span className='text-text-secondary text-sm'>계정이 없으신가요?</span>
        <Button size='xs' variant='primaryOutline'>회원가입</Button>
      </div>
    </PageTemplate>
  );
}
