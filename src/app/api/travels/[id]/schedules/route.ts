/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 > 일정 관련 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';

/** 내 여행 상세 조회 */
export async function GET(
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
    const schedule = await prisma.travelSchedule.findMany({
      where: { travelId },
      orderBy: { day: 'asc' },
      include: {
        scheduleList: { include: { place: true } },
      },
    });

    return NextResponse.json({ data: schedule }, { status: 200 });
  } catch (error) {
    console.error('@@ 내 여행 상세 일정 조회 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
