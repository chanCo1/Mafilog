/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 유저 비밀번호 api
 */

import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcryptjs';
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
    const body = await request.json();
    const { originPassword, changePassword, changePasswordConfirm } = body;

    if (!originPassword || !changePassword || !changePasswordConfirm) {
      return errorResponse('비밀번호를 입력해 주세요.', 400);
    }

    if (changePassword !== changePasswordConfirm) {
      return errorResponse('비밀번호가 일치하지 않습니다.', 400);
    }

    // 유저 정보 추출
    const extractUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!extractUser || !extractUser.password) {
      return errorResponse('유저 정보를 찾을 수 없거나 소셜 로그인 유저입니다.', 404);
    }

    const isPasswordMatch = await bcrypt.compare(originPassword, extractUser.password);

    if (!isPasswordMatch) {
      return errorResponse('현재 비밀번호가 일치하지 않습니다.', 400);
    }

    if (originPassword === changePassword) {
      return errorResponse('변경사항이 없습니다.', 400);
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(changePassword, 10);

    // 유저 업데이트
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
