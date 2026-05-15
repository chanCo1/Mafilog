import { z } from 'zod';

/** 아이디 변경 스키마 */
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, '이름(아이디)를 입력해주세요')
    .max(10, '최대 10글자까지 입력가능해요')
    .regex(/^[가-힣a-zA-Z0-9]+$/, '한글, 영문, 숫자만 입력 가능해요'),
});

export type TProfileSchema = z.infer<typeof profileSchema>;

/** 비밀번호 변경 스키마 */
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    changePassword: z
      .string()
      .min(8, '8자 이상 비밀번호를 입력해주세요')
      .max(20, '최대 20자 입력 가능해요')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
        '영문+숫자+특수문자 조합으로 입력해주세요',
      ),
    changePasswordConfirm: z.string().min(1, '변경할 비밀번호를 입력해주세요'),
  })
  .refine((value) => value.changePassword === value.changePasswordConfirm, {
    message: '비밀번호가 일치하지 않아요',
    path: ['passwordConfirm'],
  });
export type TPasswordSchema = z.infer<typeof passwordSchema>;
