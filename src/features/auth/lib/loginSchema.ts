import { z } from 'zod';

/** 로그인 스키마 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('이메일 형식이 아니에요'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요'),
});
export type loginSchemaType = z.infer<typeof loginSchema>;