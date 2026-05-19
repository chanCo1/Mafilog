/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 > 일정 관련 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import { ISchedulePlaceRequest } from '@/features/myTravel/interfaces/schedule.interface';
import { SCHEDULE_TYPE } from '@/shared/types/Enum';

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

  if (type === SCHEDULE_TYPE.PLACE && !place.length) {
    return NextResponse.json(
      { message: '등록할 장소가 선택되지 않았습니다.' },
      { status: 400 },
    );
  }

  try {
    const registSchedule = await prisma.$transaction(async (tx) => {
      if (type === SCHEDULE_TYPE.PLACE && place.length > 0) {
        const createdItems = await Promise.all(
          place.map((_place) => {
            return tx.scheduleList.create({
              data: {
                type,
                day: Number(day),
                time: time || '',
                memo: memo || '',
                schedule: { connect: { id: Number(scheduleId) } },
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
            day: day,
            time: time || '',
            memo: memo || '',
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
