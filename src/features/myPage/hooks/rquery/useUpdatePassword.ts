/**
 * @file: useUpdatePassword.ts
 * @author: chad
 * @since: 2026.05.24 ~
 * @description: 유저 비밀번호 수정
 */

import { useMutation } from '@tanstack/react-query';
import UserService from '@/features/myPage/services/User.service';
import { toast } from 'sonner';
import { TPasswordSchema } from '@/features/myPage/schema/profile.schema';
import { AxiosError } from 'axios';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: TPasswordSchema) => {
      const res = await UserService.updatePassword(
        data,
      );
      return res.data;
    },
    onSuccess: async () => {
      toast.success('비밀번호를 변경했어요');
    },
    onError: (error: any) => {
      const axiosError = error as AxiosError<{ message: string }>;
      
      const errorMsg = axiosError.response?.data?.message;
      toast.error(errorMsg || '프로필 변경에 실패했습니다.');
    },
  });
};
