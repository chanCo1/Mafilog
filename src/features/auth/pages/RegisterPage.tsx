'use client';

/**
 * @file: RegisterPage.tsx
 * @author: chad
 * @since: 2026.04.23 ~
 * @description: RegisterPage 컴포넌트, 회원가입 페이지
 */

import { Input } from '@/shared/components/ui/Input';
import PageTemplate from '@/features/auth/components/PageTemplate';
import { Button } from '@/shared/components/ui/Button';
import {
  registerShema,
  TRegisterShema,
} from '@/features/auth/schema/register.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterShema>({
    resolver: zodResolver(registerShema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  /** 회원가입 */
  const onSubmit = (value: TRegisterShema) => {
    console.log(value);
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <PageTemplate title="회원가입" backBtnLabel="로그인" path="/login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Input
            label="이메일"
            isRequired
            placeholder="이메일을 입력해주세요"
            errorMsg={errors.email?.message}
            description="example@example.com"
            {...register('email')}
          />
          <Input
            label="이름(아이디)"
            isRequired
            placeholder="이름(아이디)을 입력해주세요"
            errorMsg={errors.name?.message}
            description="한글, 영문, 숫자, 최대 10글자 입력 가능"
            {...register('name')}
          />
          <Input
            type='password'
            label="비밀번호"
            isRequired
            placeholder="비밀번호를 입력해주세요"
            errorMsg={errors.password?.message}
            isPassword
            description="영문 + 숫자 + 특수문자 조합, 최대 20자 입력 가능"
            {...register('password')}
          />
          <Input
            type='password'
            label="비밀번호 확인"
            isRequired
            placeholder="비밀번호를 다시 입력해주세요"
            errorMsg={errors.passwordConfirm?.message}
            isPassword
            {...register('passwordConfirm')}
          />
        </div>
        <Button
          type="submit"
          className="mt-8 w-full"
          size="lg"
          isLoading={isLoading}
        >
          회원가입
        </Button>
      </form>
    </PageTemplate>
  );
}
