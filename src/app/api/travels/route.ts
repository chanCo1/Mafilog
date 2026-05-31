/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 내 여행 관련 api
 */

import { prisma } from '@/shared/lib/prisma';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { IMemberList } from '@/shared/interfaces';
import { authGuard } from '@/shared/backend/lib/authGuard';
import { uploadCloudinary } from '@/shared/backend/lib/cloudinary';
import { getTravelDayOfWeek } from '@/shared/lib/utils';
import { CHECKLIST_MOCK_DATA } from '@/shared/backend/data/mockupData';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

/** 새 여행 만들기 */
export async function POST(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;

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

    const uploadedUrls = await uploadCloudinary({ files });
    const imageUrl = uploadedUrls.length ? uploadedUrls[0] : null;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const travelDays = getTravelDayOfWeek(fromDate, toDate);

    // 겹치는 날짜 있는지 DB 조회
    const travelConflict = await prisma.travel.findFirst({
      where: {
        userId: currentUserId,
        // 기존 시작일이 새 종료일보다 작거나 같고
        from: { lte: toDate },
        // 기존 종료일이 새 시작일보다 크거나 같다
        to: { gte: fromDate },
      },
    });

    if (travelConflict)
      return errorResponse('해당 날짜에는 이미 등록된 여행이 있습니다.', 400);

    await prisma.$transaction(
      async (tx) => {
        // 여행 테이블에 저장
        const newTravel = await tx.travel.create({
          data: {
            title,
            from: fromDate,
            to: toDate,
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
        if (cities?.length > 0) {
          await tx.travelCity.createMany({
            data: cities.map((city: IPlaceList) => ({
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
            })),
          });
        }

        // 멤버 테이블에 저장
        if (member?.length > 0) {
          await tx.travelMember.createMany({
            data: member.map((m: IMemberList) => ({
              name: m.name,
              travelId: newTravel.id,
              userId: m.id,
            })),
          });
        }

        // 스케줄 테이블에 기간별 저장
        await tx.travelSchedule.createMany({
          data: travelDays.map((_day) => ({
            day: _day.day,
            date: _day.date,
            travelId: newTravel.id,
          })),
        });

        // 가계부 테이블에 기간별 저장
        await tx.travelExpense.createMany({
          data: [
            { day: 0, date: null, travelId: newTravel.id },
            ...travelDays.map((_day) => ({
              day: _day.day,
              date: _day.date,
              travelId: newTravel.id,
            })),
          ],
        });

        // 체크리스트 테이블에 목업 데이터 저장
        for (const category of CHECKLIST_MOCK_DATA) {
          const newCategory = await tx.checklistCategory.create({
            data: { label: category.label, travelId: newTravel.id },
          });

          // 하위 아이템 저장
          if (category.list?.length > 0) {
            await tx.checklistItem.createMany({
              data: category.list.map((item) => ({
                label: item,
                isChecked: false,
                categoryId: newCategory.id,
              })),
            });
          }
        }
      },
      { timeout: 100000 },
    );

    return successResponse();
  } catch (error) {
    console.error('@@ 내 여행 생성 에러 >>', error);
    return errorResponse();
  }
}

/** 내 여행 리스트 조회 */
export async function GET(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;

  try {
    const myTravelList = await prisma.travel.findMany({
      where: {
        userId: currentUserId,
      },
      include: {
        cities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse(myTravelList);
  } catch (error) {
    console.error('@@ 내 여행 리스트 조회 에러 >>', error);
    return errorResponse();
  }
}
