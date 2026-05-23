/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 여행 일정 선택 이동
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
  if (!authValidate.isValid) {
    return authValidate.errorResponse;
  }

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const body = (await request.json()) as {
      moveIds: number[];
      targetDay: number;
    };
    const { moveIds, targetDay } = body;
    if (!moveIds?.length || !targetDay)
      return errorResponse('필수 데이터가 누락되었습니다.', 400);

    const targetSchedule = await prisma.travelSchedule.findFirst({
      where: { travelId, day: targetDay },
    });
    if (!targetSchedule)
      return errorResponse('이동하려는 일정을 찾을 수 없습니다.', 404);

    const lastItem = await prisma.scheduleList.findFirst({
      where: { scheduleId: targetSchedule.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    if (!lastItem)
      return errorResponse('이동하려는 일정의 순서를 찾을 수 없습니다.', 404);

    const startOrder = lastItem?.order ?? -1;

    await prisma.$transaction(async (tx) => {
      // TODO: 이동 전, 후로 order 재정렬 할건지 고민..
      // // 이동 아이템들의 스케줄 아이디
      // const movingItems = await tx.scheduleList.findMany({
      //   where: { id: { in: moveIds } },
      //   select: { scheduleId: true },
      //   distinct: ['scheduleId'],
      // });

      // await Promise.all(
      //   moveIds.map((id, index) =>
      //     tx.scheduleList.update({
      //       where: { id },
      //       data: {
      //         day: targetDay,
      //         scheduleId: targetSchedule.id,
      //         order: startOrder + index,
      //       },
      //     }),
      //   ),
      // );

      // // 이동 아이템 빠진 스케줄의 재정렬
      // await Promise.all(
      //   movingItems.map(async ({ scheduleId,  }) => {
      //     const remainItems = await tx.scheduleList.findMany({
      //       where: { scheduleId },
      //       orderBy: { order: 'asc' },
      //       select: { id: true },
      //     });

      //     return Promise.all(
      //       remainItems.map((item, index) =>
      //         tx.scheduleList.update({
      //           where: { id: item.id },
      //           data: { order: index },
      //         }),
      //       ),
      //     );
      //   }),
      // );

      // // 이동된 스케줄에서 재정렬
      // const afterItems = await tx.scheduleList.findMany({
      //   where: { scheduleId: targetSchedule.id },
      //   orderBy: { order: 'asc' },
      //   select: { id: true },
      // });

      // await Promise.all(
      //   afterItems.map((item, index) =>
      //     tx.scheduleList.update({
      //       where: { id: item.id },
      //       data: { order: index },
      //     }),
      //   ),
      // );

      await Promise.all(
        moveIds.map((id, index) =>
          tx.scheduleList.update({
            where: { id },
            data: {
              day: targetDay,
              scheduleId: targetSchedule.id,
              order: startOrder + index + 1,
            },
          }),
        ),
      );
    });

    return successResponse();
  } catch (error) {
    console.error('@@ 다중 일정 이동 에러 >>', error);
    return errorResponse();
  }
}
