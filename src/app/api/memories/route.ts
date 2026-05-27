/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.26 ~
 * @description: 추억 채우기 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';
import { uploadCloudinary } from '@/shared/backend/lib/cloudinary';

/** 추억 생성 */
export async function POST(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const formData = await request.formData();

    const mapId = formData.get('mapId') as string;
    const mapType = formData.get('mapType') as string;

    const title = formData.get('title') as string;
    const from = formData.get('from') as string;
    const to = formData.get('to') as string;
    const memo = formData.get('memo') as string;
    const scheduleId = formData.get('scheduleId') as string | null;
    const scheduleTitle = formData.get('scheduleTitle') as string | null;
    const hexCode = formData.get('mapColor') as string;

    const rawSchedules = JSON.parse(formData.get('schedules') as string);
    const files = formData.getAll('imageUrl') as File[];

    const uploadedUrls = await uploadCloudinary({ files });

    const newMemory = await prisma.$transaction(async (tx) => {
      // 추억 생성
      const createdMemory = await tx.memory.create({
        data: {
          title,
          from: new Date(from),
          to: new Date(to),
          imageUrl: uploadedUrls,
          mapType,
          mapId,
          memo,
          hexCode,
          scheduleId: scheduleId || null,
          scheduleTitle: scheduleTitle || null,
          user: { connect: { id: currentUserId } },

          schedules: {
            create: rawSchedules.map((dailyData: any) => ({
              day: dailyData.day,
              date: new Date(dailyData.date),
              scheduleList: {
                create: dailyData.scheduleList.map((list: any) => ({
                  type: list.type,
                  time: list.time || null,
                  memo: list.memo || null,
                  rating: list.rating || 0,
                  order: list.order,
                  place: list.place ? list.place : null,
                })),
              },
            })),
          },
        },
      });

      return createdMemory;
    });

    return successResponse(newMemory);
  } catch (error) {
    console.error('@@ 추억 생성 에러 >>', error);
    return errorResponse();
  }
}

/** 추억 리스트 조회 */
export async function GET(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const mapType = searchParams.get('mapType');
    const mapId = searchParams.get('mapId');

    const memories = await prisma.memory.findMany({
      where: {
        userId: currentUserId,
        // mapType이나 mapId가 있으면 필터 조회, 없으면 전체 조회
        ...(mapType && { mapType }),
        ...(mapId && { mapId }),
      },
      // include: {
      //   schedules: {
      //     orderBy: { id: 'asc' },
      //   },
      // },
    });

    return successResponse(memories);
  } catch (error) {
    console.error('@@ 추억 리스트 조회 에러 >>', error);
    return errorResponse();
  }
}
