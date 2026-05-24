/**
 * @file: useUpdateProfile.ts
 * @author: chad
 * @since: 2026.05.24 ~
 * @description: 유저 프로필 수정
 */

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import UserService from '@/features/myPage/services/User.service';
import { toast } from 'sonner';

export const useUpdateProfile = () => {
  const { data: userInfo, update } = useSession();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await UserService.updateProfile(
        userInfo?.user?.id as string,
        formData,
      );
      return res.data;
    },
    onSuccess: async (data, variables) => {
      const newName = variables.get('name') as string;
      const newImage = variables.get('profileImage');

      await update({
        name: newName,
        profileImageUrl: newImage === 'delete' ? null : data?.profileImageUrl,
      });

      toast.success('프로필을 변경했어요');
    },
    onError: (error) => {
      console.error(error);
      toast.error('프로필 변경에 실패했습니다.');
    },
  });
};
