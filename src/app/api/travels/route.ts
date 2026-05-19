/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 내 여행 관련 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { IMemberList } from '@/shared/interfaces';
import { authGuard } from '@/shared/backend/lib/authGuard';
import { uploadCloudinary } from '@/shared/backend/lib/cloudinary';

/** 새 여행 만들기 */
export async function POST(request: Request) {
  const authValidate = await authGuard(request);

  if (!authValidate.isValid) {
    return authValidate.errorResponse;
  }

  const session = authValidate.session;

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const from = formData.get('from') as string;
    const to = formData.get('to') as string;
    const travelType = formData.get('travelType') as string;
    const travelPartner = formData.get('travelPartner') as string;
    const travelPeriod = formData.get('travelPeriod') as string;

    const cities = JSON.parse(formData.get('cities') as string);
    const travelStyles = JSON.parse(formData.get('travelStyles') as string);
    const member = JSON.parse(formData.get('member') as string);

    const files = formData.getAll('imageUrl') as File[];

    const currentUserId = session?.user?.id;

    const uploadedUrls = await uploadCloudinary({ files });
    const imageUrl = uploadedUrls.length ? uploadedUrls[0] : null;

    const newFromDate = new Date(from);
    const newToDate = new Date(to);

    // 겹치는 날짜 있는지 DB 조회
    const travelConflict = await prisma.travel.findFirst({
      where: {
        userId: currentUserId,
        // 기존 시작일이 새 종료일보다 작거나 같고
        from: {
          lte: newToDate,
        },
        // 기존 종료일이 새 시작일보다 크거나 같다
        to: {
          gte: newFromDate,
        },
      },
    });

    if (travelConflict) {
      return NextResponse.json(
        { message: '해당 날짜에는 이미 등록된 여행이 있습니다.' },
        { status: 400 },
      );
    }

    // 여행 테이블에 저장
    const newTravel = await prisma.travel.create({
      data: {
        title,
        from: new Date(from),
        to: new Date(to),
        travelType,
        travelPartner,
        travelPeriod,
        travelStyles,
        imageUrl: imageUrl || null,
        user: {
          connect: { id: currentUserId },
        },
      },
    });

    // 도시 테이블에 저장
    if (cities && cities.length > 0) {
      await Promise.all(
        cities.map((city: IPlaceList) =>
          prisma.travelCity.create({
            data: {
              id: city.id,
              name: city.name,
              address: city.address,
              timezone: city.timezone || null,
              types: city.types,
              lat: city.lat,
              lng: city.lng,
              countryName: city.countryName ?? '',
              countryCode: city.countryCode ?? '',
              travelId: newTravel.id,
            },
          }),
        ),
      );
    }

    // 멤버 테이블에 저장
    if (member && member.length > 0) {
      await Promise.all(
        member.map((member: IMemberList) => {
          const isMe = member.id === currentUserId;

          return prisma.travelMember.create({
            data: {
              name: member.name,
              travelId: newTravel.id,
              userId: isMe ? currentUserId : null,
            },
          });
        }),
      );
    }

    return NextResponse.json(
      { success: true, message: '여행 저장 완료' },
      { status: 200 },
    );
  } catch (error) {
    console.error('@@ 내 여행 생성 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}

/** 내 여행 리스트 조회 */
export async function GET(request: Request) {
  const authValidate = await authGuard(request);

  if (!authValidate.isValid) {
    return authValidate.errorResponse;
  }

  const session = authValidate.session;

  try {
    const myTravelList = await prisma.travel.findMany({
      where: {
        userId: session?.user?.id,
      },
      include: {
        cities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ data: myTravelList }, { status: 200 });
  } catch (error) {
    console.error('@@ 내 여행 리스트 조회 에러 >>', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
