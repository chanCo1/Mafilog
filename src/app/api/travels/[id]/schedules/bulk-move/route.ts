/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.20 ~
 * @description: 여행 일정 선택 이동
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) {
    return authValidate.errorResponse;
  }

  const travelId = Number(params.id);

  if (!travelId) {
    return NextResponse.json(
      { message: '잘 못 된 접근입니다.' },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as {
      moveIds: number[];
      targetDay: number;
    };
    const { moveIds, targetDay } = body;

    if (!moveIds?.length || !targetDay) {
      return NextResponse.json(
        { message: '필수 데이터가 누락되었습니다.' },
        { status: 400 },
      );
    }

    const targetSchedule = await prisma.travelSchedule.findFirst({
      where: { travelId, day: targetDay },
    });

    if (!targetSchedule) {
      return NextResponse.json(
        { message: '이동하려는 일정을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    await prisma.scheduleList.updateMany({
      where: { id: { in: moveIds } },
      data: {
        day: targetDay,
        scheduleId: targetSchedule.id,
      },
    });

    return NextResponse.json(
      {
        message: `이동이 완료되었습니다.`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('@@ 다중 일정 이동 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
