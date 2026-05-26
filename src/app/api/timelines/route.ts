/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 타임라인 리스트 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

/** 타임라인 리스트 조회 */
export async function GET(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const travelTimeline = await prisma.travel.findMany({
      where: {
        userId: currentUserId,
        to: {
          lt: new Date(),
        },
      },
      include: {
        cities: true,
        // expenses: {
        //   include: {
        //     expenseList: {
        //       include: {
        //         spender: { include: { member: true } },
        //         payer: true,
        //       },
        //     },
        //   },
        // },
      },
      orderBy: { from: 'desc' },
    });

    return successResponse(travelTimeline);
  } catch (error) {
    console.log('@@ 타임라인 조회 에러', error);
    return errorResponse();
  }
}
