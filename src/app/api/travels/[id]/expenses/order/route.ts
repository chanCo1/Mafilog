/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.29 ~
 * @description: 여행 지출 순서 이동
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const body = (await request.json()) as {
      orderedItems: {
        id: number;
        order: number;
      }[];
    };

    const { orderedItems } = body;

    if (!orderedItems.length)
      return errorResponse('필수 데이터가 누락되었습니다.', 400);

    const isMyTravel = await prisma.travel.findFirst({
      where: {
        id: Number(travelId),
        userId: currentUserId,
      },
    });

    if (!isMyTravel) return errorResponse('잘 못 된 접근입니다.', 403);

    await prisma.$transaction(
      orderedItems.map((item) =>
        prisma.expenseList.update({
          where: { id: item.id },
          data: { order: item.order },
        }),
      ),
    );

    return successResponse();
  } catch (error) {
    console.error('@@ 지출 이동 에러 >>', error);
    return errorResponse();
  }
}
