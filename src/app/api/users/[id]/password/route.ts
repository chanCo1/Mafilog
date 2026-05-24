/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 유저 비밀번호 api
 */

import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

export async function PATCH(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    // 파일이 없으므로 JSON으로 받습니다.
    const body = await request.json();
    const { password, passwordConfirm } = body;

    if (!password || !passwordConfirm) {
      return errorResponse('비밀번호를 입력해 주세요.', 400);
    }

    if (password !== passwordConfirm) {
      return errorResponse('비밀번호가 일치하지 않습니다.', 400);
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB 업데이트
    await prisma.user.update({
      where: { id: currentUserId },
      data: { password: hashedPassword },
    });

    return successResponse();
  } catch (error) {
    console.log('@@ 비밀번호 변경 에러', error);
    return errorResponse();
  }
}
