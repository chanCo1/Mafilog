'use client';

/**
 * @file: LoginPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: LoginPage 컴포넌트, 로그인 페이지
 */

import { useState } from 'react';
import { Input } from '@/shared/components/ui/Input';
import PageTemplate from '@/features/auth/components/PageTemplate';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { Button } from '@/shared/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginSchemaType } from '@/features/auth/schema/login.schema';
import { toast } from 'sonner';
import { useAuthManagerStore } from '@/shared/stores/useAuthManagerStore';

interface ILoginPage {}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthManagerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [saveEmail, setSaveEmail] = useState(false);

  /** 로그인 */
  const onSubmit = () => {
    login();
    router.push('/');
    toast.success('로그인에 성공했어요');
  };

  return (
    <PageTemplate title="로그인" backBtnLabel="홈으로" path="/">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Input
            label="이메일"
            isRequired
            placeholder="이메일을 입력해주세요"
            errorMsg={errors.email?.message}
            description="example@example.com"
            {...register('email')}
          />
          <Input
            type="password"
            label="비밀번호"
            isRequired
            placeholder="비밀번호를 입력해주세요"
            errorMsg={errors.password?.message}
            description="영문 + 숫자 + 특수문자 조합"
            isPassword
            {...register('password')}
          />
        </div>
        <Checkbox
          checkboxLabel="이메일 저장"
          value={saveEmail}
          onChange={(v) => setSaveEmail(v as boolean)}
        />
        <Button type="submit" className="w-full" size="lg">
          로그인
        </Button>
      </form>

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
            className="cursor-pointer rounded-full object-contain"
          />
          <Image
            src={'/kakao.png'}
            alt="구글 소셜 로그인 이미지"
            width={36}
            height={36}
            className="cursor-pointer rounded-full object-contain"
          />
          <Image
            src={'/naver.png'}
            alt="구글 소셜 로그인 이미지"
            width={36}
            height={36}
            className="cursor-pointer rounded-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-text-secondary text-sm">계정이 없으신가요?</span>
        <Button
          size="xs"
          variant="primaryOutline"
          onClick={() => router.push('register')}
        >
          회원가입
        </Button>
      </div>
    </PageTemplate>
  );
}
