/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 타임라인 > 여행 지출 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

/** 타임라인 리스트 조회 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const travelExpenses = await prisma.travelExpense.findMany({
      where: {
        travelId,
      },
    });

    return successResponse(travelExpenses);
  } catch (error) {
    console.log('@@ 타임라인 가계부 지출 조회 에러', error);
    return errorResponse();
  }
}
