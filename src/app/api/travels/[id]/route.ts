/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 관련 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';
import { uploadCloudinary } from '@/shared/backend/lib/cloudinary';
import { IMemberList } from '@/shared/interfaces';
import { IPlaceList } from '@/features/myTravel/interfaces/schedule.interface';
import { getTravelDayOfWeek } from '@/shared/lib/utils';

/** 여행 상세 조회 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const myTravelList = await prisma.travel.findUnique({
      where: {
        id: travelId,
      },
      include: {
        cities: true,
        member: true,
      },
    });

    return successResponse(myTravelList);
  } catch (error) {
    console.error('@@ 내 여행 상세 조회 에러 >>', error);
    return errorResponse();
  }
}

/** 여행 상세 수정 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const session = authValidate.session;
  const currentUserId = session?.user?.id;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  // 여행 존재 여부
  const existTravel = await prisma.travel.findUnique({
    where: { id: travelId },
    include: {
      cities: true,
      member: true,
    },
  });
  if (!existTravel || existTravel.userId !== currentUserId)
    return errorResponse('수정 권한이 없거나 존재하지 않는 여행입니다.', 403);

  try {
    const formData = await request.formData();

    // 기본 정보
    const title = formData.get('title') as string;
    const from = formData.get('from') as string;
    const to = formData.get('to') as string;
    const travelType = formData.get('travelType') as string;
    const travelPartner = formData.get('travelPartner') as string;
    const travelPeriod = formData.get('travelPeriod') as string;

    const cities = JSON.parse(formData.get('cities') as string);
    const travelStyles = JSON.parse(formData.get('travelStyles') as string);
    const member = JSON.parse(formData.get('member') as string);

    const fromDate = new Date(from);
    const toDate = new Date(to);

    // 겹치는 날짜 있는지 DB 조회
    const travelConflict = await prisma.travel.findFirst({
      where: {
        userId: currentUserId,
        id: { not: travelId },
        // 기존 시작일이 새 종료일보다 작거나 같고
        from: { lte: toDate },
        // 기존 종료일이 새 시작일보다 크거나 같다
        to: { gte: fromDate },
      },
    });
    if (travelConflict)
      return errorResponse('해당 날짜에는 이미 등록된 여행이 있습니다.', 400);

    const files = formData.getAll('imageUrl');
    const imageFiles = files.filter(
      (entry) => typeof entry !== 'string',
    ) as File[];
    const imageUrls = files.filter(
      (entry) => typeof entry === 'string',
    ) as string[];

    // 기존 데이터
    const originDbState = JSON.stringify({
      title: existTravel.title,
      travelType: existTravel.travelType,
      travelPartner: existTravel.travelPartner,
      travelPeriod: existTravel.travelPeriod,
      from: existTravel.from.toISOString(),
      to: existTravel.to.toISOString(),
      travelStyles: existTravel.travelStyles,
      cities: existTravel.cities.map((c) => c.id),
      member: existTravel.member.map((m) => m.name),
      imageUrl: existTravel.imageUrl,
    });

    // 변경 데이터
    const requestState = JSON.stringify({
      title,
      travelType,
      travelPartner,
      travelPeriod: travelPeriod,
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
      travelStyles,
      cities: cities.map((c: IPlaceList) => c.id),
      members: member.map((m: IMemberList) => m.name),
      image: imageFiles.length > 0 ? 'new' : imageUrls[0] || null,
    });

    if (originDbState === requestState) {
      return successResponse();
    }

    let imageUrl = existTravel.imageUrl;
    if (imageFiles.length > 0) {
      const uploadedUrls = await uploadCloudinary({ files: imageFiles });
      imageUrl = uploadedUrls.length ? uploadedUrls[0] : null;
    } else if (imageUrls.length > 0) {
      imageUrl = imageUrls[0];
    } else {
      imageUrl = null;
    }

    await prisma.$transaction(async (tx) => {
      // 기본 정보 저장
      await tx.travel.update({
        where: { id: travelId },
        data: {
          title,
          from: fromDate,
          to: toDate,
          travelType,
          travelPartner,
          travelPeriod,
          travelStyles,
          imageUrl,
        },
      });

      // 도시 저장
      await tx.travelCity.deleteMany({ where: { travelId } });
      if (cities.length) {
        await Promise.all(
          cities.map((city: IPlaceList) =>
            tx.travelCity.create({
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
                travelId,
              },
            }),
          ),
        );
      }

      // 멤버 저장
      await tx.travelMember.deleteMany({ where: { travelId } });
      if (member.length) {
        await Promise.all(
          member.map((member: IMemberList) => {
            return tx.travelMember.create({
              data: {
                name: member.name,
                travelId,
                userId: member.id,
              },
            });
          }),
        );
      }

      // 새로운 날짜
      const newDays = getTravelDayOfWeek(fromDate, toDate);
      const newDateTimes = newDays.map((day) => day.date.getTime());

      // 해당 여행에 스케줄 정보
      const existingSchedules = await tx.travelSchedule.findMany({
        where: { travelId },
      });

      // 기존 날짜가 새로운 날짜에 포함하고 있지 않으면 삭제 대상
      const schedulesToDelete = existingSchedules.filter(
        (schedule) =>
          schedule.date && !newDateTimes.includes(schedule.date.getTime()),
      );

      if (schedulesToDelete.length > 0) {
        // 다중 삭제
        await tx.travelSchedule.deleteMany({
          where: {
            id: { in: schedulesToDelete.map((schedule) => schedule.id) },
          },
        });
      }

      // 새로운 날짜 반복
      for (const newDay of newDays) {
        // 기존 날짜와 새로운 날짜가 같으면
        const existing = existingSchedules.find(
          (schedule) => schedule.date?.getTime() === newDay.date.getTime(),
        );
        // 날짜 업데이트
        if (existing) {
          await tx.travelSchedule.update({
            where: { id: existing.id },
            data: { day: newDay.day },
          });
        } else {
          // 아니면 날짜 생성
          await tx.travelSchedule.create({
            data: { travelId, day: newDay.day, date: newDay.date },
          });
        }
      }

      // 가계부
      const existingExpenses = await tx.travelExpense.findMany({
        where: { travelId },
      });

      const expensesToDelete = existingExpenses.filter(
        (e) => e.date && !newDateTimes.includes(e.date.getTime()),
      );
      if (expensesToDelete.length > 0) {
        await tx.travelExpense.deleteMany({
          where: { id: { in: expensesToDelete.map((e) => e.id) } },
        });
      }

      // 생성
      for (const newDay of newDays) {
        const existing = existingExpenses.find(
          (e) => e.date?.getTime() === newDay.date.getTime(),
        );
        if (existing) {
          await tx.travelExpense.update({
            where: { id: existing.id },
            data: { day: newDay.day },
          });
        } else {
          await tx.travelExpense.create({
            data: { travelId, day: newDay.day, date: newDay.date },
          });
        }
      }
    });

    return successResponse();
  } catch (error) {
    console.error('@@ 여행 수정 에러 >>', error);
    return errorResponse();
  }
}
