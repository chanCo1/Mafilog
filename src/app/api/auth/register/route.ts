/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 회원가입 api
 */

import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';
import { getHexCode } from '@/shared/lib/utils';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, passwordConfirm } = body;

  try {
    // 입력 유효성 검사
    if (!email || !name || !password || !passwordConfirm) {
      return errorResponse('입력되지 않은 항목이 있습니다.', 400);
    }

    // 비밀번호 확인 유효성 검사
    if (password !== passwordConfirm) {
      return errorResponse('비밀번호가 일치하지 않습니다.', 400);
    }

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    // 이미 가입되어 있는지 유효성 검사
    if (findUser) {
      return errorResponse('이미 가입되어 있는 이메일입니다.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hexCode = getHexCode();
    // 회원가입 생성
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
        hexCode: hexCode || '#6f9dd3',
      },
    });

    return successResponse();
  } catch (error) {
    console.log('@@ 회원가입 에러', error);
    return errorResponse();
  }
}
