/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 추억 상세 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

/** 추억 상세 조회 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  const memoryId = Number(params.id);
  if (!memoryId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const memory = await prisma.memory.findUnique({
      where: {
        id: memoryId,
        userId: currentUserId,
      },
      include: {
        schedules: {
          orderBy: { day: 'asc' },
          include: { scheduleList: true },
        },
      },
    });

    return successResponse(memory);
  } catch (error) {
    console.error('@@ 추억 리스트 조회 에러 >>', error);
    return errorResponse();
  }
}
