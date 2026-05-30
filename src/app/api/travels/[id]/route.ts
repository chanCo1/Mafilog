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
import {
  deleteCloudinary,
  uploadCloudinary,
} from '@/shared/backend/lib/cloudinary';
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

  // 기존 여행 추출
  const extractTravel = await prisma.travel.findUnique({
    where: { id: travelId },
    include: {
      cities: true,
      member: true,
    },
  });
  if (!extractTravel || extractTravel.userId !== currentUserId)
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
    const newImageFile = files.filter(
      (entry) => typeof entry !== 'string',
    ) as File[];
    const originImageUrls = files.filter(
      (entry) => typeof entry === 'string',
    ) as string[];

    // 기존 데이터
    const originDbState = JSON.stringify({
      title: extractTravel.title,
      travelType: extractTravel.travelType,
      travelPartner: extractTravel.travelPartner,
      travelPeriod: extractTravel.travelPeriod,
      from: extractTravel.from.toISOString(),
      to: extractTravel.to.toISOString(),
      travelStyles: extractTravel.travelStyles,
      cities: extractTravel.cities.map((c) => c.id),
      member: extractTravel.member.map((m) => m.name),
      imageUrl: extractTravel.imageUrl,
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
      image: newImageFile.length > 0 ? 'new' : originImageUrls[0] || null,
    });

    if (originDbState === requestState) {
      return successResponse();
    }

    // 이미지 처리
    let imageUrl = extractTravel.imageUrl;
    if (newImageFile.length > 0) {
      if (imageUrl) {
        await deleteCloudinary(imageUrl);
      }

      const uploadedUrls = await uploadCloudinary({ files: newImageFile });
      imageUrl = uploadedUrls.length ? uploadedUrls[0] : null;
    } else if (originImageUrls.length > 0) {
      imageUrl = originImageUrls[0];
    } else {
      if (imageUrl) {
        await deleteCloudinary(imageUrl);
      }
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

      /** 멤버 수정 */
      if (member.length) {
        // 기존 멤버 목록 가져오기
        const originMembers = await tx.travelMember.findMany({
          where: { travelId },
        });

        // 프론트에서 받은 멤버 정보
        const newMemberIds = member.map((member: IMemberList) =>
          String(member.userId),
        );
        // 기존 멤버
        const existingUserIds = originMembers.map((member) =>
          String(member.userId),
        );

        // 새로운 멤버 찾기
        const newMembers = member.filter(
          (member: IMemberList) =>
            !existingUserIds.includes(String(member.userId)),
        );

        if (newMembers.length > 0) {
          await Promise.all(
            newMembers.map((member: IMemberList) => {
              return tx.travelMember.create({
                data: {
                  name: member.name,
                  travelId,
                  userId: String(member.userId),
                },
              });
            }),
          );
        }

        const updatedMembers = member.filter((member: IMemberList) =>
          existingUserIds.includes(String(member.userId)),
        );

        // 기존 멤버 이름 수정
        if (updatedMembers.length > 0) {
          await Promise.all(
            updatedMembers.map(async (member: IMemberList) => {
              // 기존 멤버 찾기
              const target = originMembers.find(
                (origin) => String(origin.userId) === String(member.userId),
              );
              // 이름이 다를 때만 업데이트 실행
              if (target && target.name !== member.name) {
                return tx.travelMember.update({
                  where: { id: target.id },
                  data: { name: member.name },
                });
              }
            }),
          );
        }

        const deleteMember = originMembers.filter(
          (member) => !newMemberIds.includes(String(member.userId)),
        );

        // 멤버 삭제
        if (deleteMember.length > 0) {
          await tx.travelMember.deleteMany({
            where: {
              id: { in: deleteMember.map((member) => member.id) },
            },
          });
        }
      }

      // 새로운 여행 날짜 배열
      const newDays = getTravelDayOfWeek(fromDate, toDate);

      /** 스케줄(일정) */
      const existingSchedules = await tx.travelSchedule.findMany({
        where: { travelId },
      });
      const matchedScheduleIds = new Set<number>();

      // Day 0 (여행전)은 무조건 유지
      existingSchedules.forEach((schedule) => {
        if (schedule.day === 0) matchedScheduleIds.add(schedule.id);
      });

      for (const newDay of newDays) {
        // 일치하는 날짜 찾기
        const existing = existingSchedules.find(
          (schedule) =>
            schedule.date?.getTime() === newDay.date.getTime() ||
            (!schedule.date && schedule.day === newDay.day),
        );

        if (existing) {
          matchedScheduleIds.add(existing.id);

          // 일정 수정
          await tx.travelSchedule.update({
            where: { id: existing.id },
            data: { day: newDay.day, date: newDay.date },
          });
        } else {
          // 일정 생성
          await tx.travelSchedule.create({
            data: { travelId, day: newDay.day, date: newDay.date },
          });
        }
      }

      const schedulesToDelete = existingSchedules.filter(
        (schedule) => !matchedScheduleIds.has(schedule.id),
      );
      // 새로운 기간에 포함되지 않은 일정 삭제
      if (schedulesToDelete.length > 0) {
        await tx.travelSchedule.deleteMany({
          where: {
            id: { in: schedulesToDelete.map((schedule) => schedule.id) },
          },
        });
      }

      /** 가계부(지출) */
      const existingExpenses = await tx.travelExpense.findMany({
        where: { travelId },
      });
      const matchedExpenseIds = new Set<number>();

      // Day 0 (여행전)은 무조건 유지
      existingExpenses.forEach((e) => {
        if (e.day === 0) matchedExpenseIds.add(e.id);
      });

      for (const newDay of newDays) {
        // 일치하는 날짜 찾기
        const existing = existingExpenses.find(
          (e) =>
            e.date?.getTime() === newDay.date.getTime() ||
            (!e.date && e.day === newDay.day),
        );

        if (existing) {
          matchedExpenseIds.add(existing.id);
          await tx.travelExpense.update({
            where: { id: existing.id },
            data: { day: newDay.day, date: newDay.date },
          });
        } else {
          await tx.travelExpense.create({
            data: { travelId, day: newDay.day, date: newDay.date },
          });
        }
      }

      const expensesToDelete = existingExpenses.filter(
        (e) => !matchedExpenseIds.has(e.id),
      );
      // 새로운 기간에 포함되지 않은 지출 삭제
      if (expensesToDelete.length > 0) {
        await tx.travelExpense.deleteMany({
          where: { id: { in: expensesToDelete.map((e) => e.id) } },
        });
      }
    });

    return successResponse();
  } catch (error) {
    console.error('@@ 여행 수정 에러 >>', error);
    return errorResponse();
  }
}

/** 여행 삭제 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    await prisma.travel.delete({
      where: { id: travelId },
    });

    return successResponse();
  } catch (error) {
    console.error('@@ 여행 삭제 에러 >>', error);
    return errorResponse();
  }
}
