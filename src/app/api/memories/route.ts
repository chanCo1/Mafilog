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
import { getHexCode } from '@/shared/lib/utils';

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

    const rawSchedules = JSON.parse(formData.get('schedules') as string);
    const files = formData.getAll('imageUrl') as File[];

    const uploadedUrls = await uploadCloudinary({ files });
    const hexCode = getHexCode();

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
        },
      });

      // 추억 스케줄 생성
      const scheduleRecords = [];
      for (const dailyData of rawSchedules) {
        for (const list of dailyData.scheduleList) {
          scheduleRecords.push({
            memoryId: createdMemory.id,
            day: list.day,
            type: list.type,
            time: list.time || null,
            memo: list.memo || null,
            rating: list.rating || 0,
            placeData: list.place ? list.place : null,
          });
        }
      }

      if (scheduleRecords.length > 0) {
        await tx.memorySchedule.createMany({
          data: scheduleRecords,
        });
      }

      return createdMemory;
    });

    return successResponse(newMemory);
  } catch (error) {
    console.error('@@ 추억 생성 에러 >>', error);
    return errorResponse();
  }
}
