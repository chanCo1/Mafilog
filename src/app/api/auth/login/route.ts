/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 로그인 api
 */

import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

export async function POST(request: Request) {
  const { email, password, rememberMe } = await request.json();

  try {
    // 입력 유효성 검사
    if (!email || !password) {
      return errorResponse('이메일 또는 비밀번호를 입력해주세요.', 400);
    }

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    // 이미 가입되어 있는지 유효성 검사
    if (!findUser) {
      return errorResponse('이메일 또는 비밀번호를 다시 확인해주세요.', 401);
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password!);

    // 비밀번호 확인
    if (!isPasswordMatch) {
      return errorResponse('이메일 또는 비밀번호를 다시 확인해주세요.', 401);
    }

    const userInfoForToken = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
    };

    const accessToken = jwt.sign(
      userInfoForToken,
      process.env.JWT_SECRET as string,
      { expiresIn: rememberMe ? '30d' : '1d' },
    );

    return successResponse({
      user: {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        profileImageUrl: findUser.profileImageUrl,
        accessToken,
        hexCode: findUser.hexCode,
      },
    });
  } catch (error) {
    return errorResponse();
  }
}
