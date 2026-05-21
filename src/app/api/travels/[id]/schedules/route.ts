/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 > 일정 관련 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  ISchedulePlaceRequest,
  IUpdateSchedulePlaceRequest,
} from '@/features/myTravel/interfaces/schedule.interface';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

/** 여행 일정(스케줄) 조회 */
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
        scheduleList: {
          orderBy: {
            order: 'asc',
          },
          include: { place: true },
        },
      },
    });

    return NextResponse.json({ data: schedule }, { status: 200 });
  } catch (error) {
    console.error('@@ 내 여행 상세 일정 조회 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}

/** 일정(장소) 등록 */
export async function POST(
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

  const body = (await request.json()) as ISchedulePlaceRequest;
  const { day, memo, place, scheduleId, time, type } = body;

  if (!scheduleId || !day || !type) {
    return NextResponse.json(
      { message: '필수 데이터가 누락되었습니다.' },
      { status: 400 },
    );
  }

  if (type === SCHEDULE_TYPE.PLACE && !place?.length) {
    return NextResponse.json(
      { message: '등록할 장소가 선택되지 않았습니다.' },
      { status: 400 },
    );
  }

  try {
    const registSchedule = await prisma.$transaction(async (tx) => {
      const lastSchedulePlace = await tx.scheduleList.findFirst({
        where: { scheduleId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      const lastOrder = (lastSchedulePlace?.order ?? -1);
      if (type === SCHEDULE_TYPE.PLACE && place && place.length > 0) {
        const createdItems = await Promise.all(
          place.map((_place, index) => {
            return tx.scheduleList.create({
              data: {
                type,
                day,
                order: lastOrder + index + 1,
                time,
                memo,
                schedule: { connect: { id: scheduleId } },
                place: {
                  connectOrCreate: {
                    where: { id: _place.id },
                    create: {
                      id: _place.id,
                      name: _place.name,
                      address: _place.address,
                      timezone: _place.timezone || null,
                      types: _place.types || [],
                      lat: _place.lat,
                      lng: _place.lng,
                      countryName: _place.countryName || '',
                      countryCode: _place.countryCode || '',
                    },
                  },
                },
              },
              include: { place: true },
            });
          }),
        );

        return createdItems;
      } else {
        const createdMemo = await tx.scheduleList.create({
          data: {
            type,
            day,
            order: lastOrder + 1,
            memo,
            schedule: { connect: { id: scheduleId } },
          },
        });
        return [createdMemo];
      }
    });

    return NextResponse.json(
      {
        data: registSchedule,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('@@ 일정 저장 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}

/** 일정 수정 */
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
    const body = (await request.json()) as IUpdateSchedulePlaceRequest;
    const { scheduleListId, day, time, memo } = body;

    if (!scheduleListId || !day || !travelId) {
      return NextResponse.json(
        { message: '필수 데이터가 누락되었습니다.' },
        { status: 400 },
      );
    }

    const targetSchedule = await prisma.travelSchedule.findFirst({
      where: {
        travelId,
        day,
      },
    });

    if (!targetSchedule) {
      return NextResponse.json(
        { message: '변경하려는 일정을 찾지 못했습니다.' },
        { status: 404 },
      );
    }

    const lastSchedulePlace = await prisma.scheduleList.findFirst({
      where: { scheduleId: targetSchedule.id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const lastOrder = (lastSchedulePlace?.order ?? -1);

    const updatedItem = await prisma.scheduleList.update({
      where: { id: scheduleListId },
      data: {
        day,
        order: lastOrder + 1,
        time: time || '',
        memo: memo || '',
        schedule: {
          connect: { id: targetSchedule.id },
        },
      },
      include: { place: true },
    });

    return NextResponse.json(
      {
        data: updatedItem,
        message: '일정이 수정되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('@@ 일정 리스트 수정 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}

/** 일정 삭제 */
export async function DELETE(
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
    const body = (await request.json()) as { deleteIds: number[] };
    const { deleteIds } = body;

    if (!deleteIds.length) {
      return NextResponse.json(
        { message: '삭제할 일정 ID가 없습니다.' },
        { status: 400 },
      );
    }

    await prisma.scheduleList.deleteMany({
      where: {
        id: {
          in: deleteIds,
        },
      },
    });

    return NextResponse.json(
      {
        message: '삭제되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('@@ 일정 리스트 삭제 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
