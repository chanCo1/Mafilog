/**
 * @file: UserInfoPage.tsx
 * @author: chad
 * @since: 2026.05.14 ~
 * @description: 계정 정보 페이지
 */

'use client';

import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  profileSchema,
  TProfileSchema,
  passwordSchema,
  TPasswordSchema,
} from '@/features/myPage/schema/profile.schema';
import { useForm } from 'react-hook-form';

export default function UserInfoPage() {
  const {
    register: profileRegister,
    handleSubmit: profileHandleSubmit,
    formState: { errors: profileErrors },
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
  } = useForm<TPasswordSchema>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      changePassword: '',
      changePasswordConfirm: '',
    },
  });

  /** 프로필 변경 */
  const onProfileSubmit = (value: TProfileSchema) => {
    console.log(value);
  };

  /** 비밀번호 변경 */
  const onPasswordSubmit = (value: TPasswordSchema) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-5 pt-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">프로필 변경</h3>
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
          <form onSubmit={profileHandleSubmit(onProfileSubmit)}>
            <div className="flex flex-col gap-2">
              <Input
                label="이름(아이디)"
                isRequired
                description="최대 10글자 입력 가능해요"
                errorMsg={profileErrors.name?.message}
                {...profileRegister('name')}
              />
              <Button type="submit" size="sm">
                프로필 변경
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Input label="이메일" value={'test@test.com'} disabled />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">비밀번호 변경</h3>
        <form
          onSubmit={passwordHandleSubmit(onPasswordSubmit)}
          className="flex flex-col gap-1"
        >
          <Input
            type="password"
            label="현재 비밀번호"
            isPassword
            isRequired
            errorMsg={passwordErrors.currentPassword?.message}
            {...passwordRegister('currentPassword')}
          />
          <Input
            type="password"
            label="변경 비밀번호"
            isPassword
            isRequired
            description="영문 + 숫자 + 특수문자 조합, 최대 20자 입력 가능해요"
            errorMsg={passwordErrors.changePassword?.message}
            {...passwordRegister('changePassword')}
          />
          <Input
            type="password"
            label="변경 비밀번호 확인"
            isPassword
            isRequired
            errorMsg={passwordErrors.changePasswordConfirm?.message}
            {...passwordRegister('changePasswordConfirm')}
          />
          <div className="flex justify-end pt-1">
            <Button type="submit" size="sm">
              비밀번호 변경
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
