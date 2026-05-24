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
import { useSession } from 'next-auth/react';
import FileUpload from '@/shared/components/ui/FileUpload';
import { useEffect, useState } from 'react';
import { useUpdateProfile } from '@/features/myPage/hooks/rquery/useUpdateProfile';

export default function UserInfoPage() {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;

  const {
    register: profileRegister,
    handleSubmit: profileHandleSubmit,
    formState: { errors: profileErrors },
    watch,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: userInfo?.name ?? '',
    },
  });

  const watchName = watch('name');

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

  const [selectedImage, setSelectedImage] = useState<(File | string)[]>([]);

  const { mutateAsync: updateProfile, isPending: isUpdatePending } = useUpdateProfile();

  /** 프로필 변경 */
  const onProfileSubmit = async (value: TProfileSchema) => {
    const formData = new FormData();

    formData.append('name', value.name);
    selectedImage.forEach((file) => {
      formData.append('imageUrl', file);
    });

    await updateProfile(formData);
  };

  /** 비밀번호 변경 */
  const onPasswordSubmit = (value: TPasswordSchema) => {
    console.log(value);
  };

  useEffect(() => {
    if (userInfo?.profileImageUrl) {
      setSelectedImage([userInfo.profileImageUrl]);
    }
  }, [userInfo?.profileImageUrl]);

  return (
    <div className="max-mobile:w-full flex w-2/5 flex-col gap-5 pt-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">프로필 변경</h3>
        <span>프로필</span>
        <div className="flex flex-col gap-3">
          <div className="max-w-100">
            <FileUpload
              className="h-50 w-50 rounded-full"
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
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
              <Input label="이메일" value={userInfo?.email ?? ''} disabled />
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={!watchName || isUpdatePending} isLoading={isUpdatePending}>
                  프로필 변경
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

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
