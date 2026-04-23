import { z } from 'zod';

/** 회원가입 스키마 */
export const registerShema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요')
      .email('이메일 형식이 아니에요'),
    name: z
      .string()
      .min(1, '이름(아이디)를 입력해주세요')
      .max(10, '최대 10글자까지 입력가능해요')
      .regex(/^[가-힣a-zA-Z0-9]+$/, '한글, 영문, 숫자만 입력 가능해요'),
    password: z
      .string()
      .min(8, '8자 이상 비밀번호를 입력해주세요')
      .max(20, '최대 20자 입력 가능해요')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
        '영문+숫자+특수문자 조합으로 입력해주세요',
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 입력해주세요'),
  })
  .refine((value) => value.password === value.passwordConfirm, {
    message: '비밀번호가 일치하지 않아요',
    path: ['passwordConfirm'],
  });
export type TRegisterShema = z.infer<typeof registerShema>;
