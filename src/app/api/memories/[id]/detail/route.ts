/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.27 ~
 * @description: 추억 상세 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';
import {
  uploadCloudinary,
  deleteCloudinary,
} from '@/shared/backend/lib/cloudinary';

/** 추억 상세 조회 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  const memoryId = Number(params.id);
  if (!memoryId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const memory = await prisma.memory.findUnique({
      where: {
        id: memoryId,
        userId: currentUserId,
      },
      include: {
        schedules: {
          orderBy: { day: 'asc' },
          include: { scheduleList: true },
        },
      },
    });

    return successResponse(memory);
  } catch (error) {
    console.error('@@ 추억 리스트 조회 에러 >>', error);
    return errorResponse();
  }
}

/** 추억 수정 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘못된 접근입니다.', 403);

  const memoryId = Number(params.id);
  if (!memoryId) return errorResponse('잘못된 접근입니다.', 400);

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
    const schedules = JSON.parse(formData.get('schedules') as string);
    const imageUrl = formData.getAll('imageUrl');

    // 기존 이미지
    const originImageUrls = imageUrl.filter(
      (item) => typeof item === 'string',
    ) as string[];

    // 문자열로 오지 않으면 새 이미지
    const newFiles = imageUrl.filter(
      (item) => typeof item !== 'string',
    ) as File[];

    // 기존 추억 정보 조회
    const extractMemory = await prisma.memory.findUnique({
      where: { id: memoryId, userId: currentUserId },
      include: {
        schedules: {
          orderBy: { day: 'asc' },
          include: {
            scheduleList: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!extractMemory) {
      return errorResponse(
        '수정할 추억을 찾을 수 없거나 권한이 없습니다.',
        404,
      );
    }

    // 이미지 변경사항 확인
    const isImageChanged =
      newFiles.length > 0 ||
      JSON.stringify(extractMemory.imageUrl) !==
        JSON.stringify(originImageUrls);

    const originState = JSON.stringify({
      title: extractMemory.title,
      from: extractMemory.from.toISOString(),
      to: extractMemory.to.toISOString(),
      mapType: extractMemory.mapType,
      mapId: extractMemory.mapId,
      memo: extractMemory.memo || null,
      hexCode: extractMemory.hexCode,
      scheduleId: extractMemory.scheduleId || null,
      scheduleTitle: extractMemory.scheduleTitle || null,
      schedules: extractMemory.schedules.map((schedule) => ({
        day: schedule.day,
        date: schedule.date.toISOString(),
        scheduleList: schedule.scheduleList.map((list) => ({
          type: list.type,
          day: list.day,
          time: list.time || null,
          memo: list.memo || null,
          rating: list.rating || 0,
          order: list.order,
          place: list.place || null,
        })),
      })),
    });

    const requestState = JSON.stringify({
      title,
      from: new Date(from).toISOString(),
      to: new Date(to).toISOString(),
      mapType,
      mapId,
      memo: memo || null,
      hexCode,
      scheduleId: scheduleId || null,
      scheduleTitle: scheduleTitle || null,
      schedules: schedules.map((schedule: any) => ({
        day: schedule.day,
        date: new Date(schedule.date).toISOString(),
        scheduleList: schedule.scheduleList.map((list: any) => ({
          type: list.type,
          day: list.day,
          time: list.time || null,
          memo: list.memo || null,
          rating: list.rating || 0,
          order: list.order,
          place: list.place || null,
        })),
      })),
    });

    // 변경사항이 없으면 데이터베이스 업데이트 안함
    if (!isImageChanged && originState === requestState) {
      return successResponse();
    }

    // 삭제할 이미지 분류
    const urlsToDelete = extractMemory.imageUrl.filter(
      (oldUrl) => !originImageUrls.includes(oldUrl),
    );

    // Cloudinary 삭제
    if (urlsToDelete.length) {
      await Promise.all(urlsToDelete.map((url) => deleteCloudinary(url)));
    }

    // 새 이미지 Cloudinary 업로드
    let newUploadUrls: string[] = [];
    if (newFiles.length) {
      newUploadUrls = await uploadCloudinary({ files: newFiles });
    }

    const finalImageUrls = [...originImageUrls, ...newUploadUrls];

    const updatedMemory = await prisma.$transaction(async (tx) => {
      return await tx.memory.update({
        where: { id: memoryId },
        data: {
          title,
          from: new Date(from),
          to: new Date(to),
          imageUrl: finalImageUrls,
          mapType,
          mapId,
          memo,
          hexCode,
          scheduleId: scheduleId || null,
          scheduleTitle: scheduleTitle || null,
          schedules: {
            // 이 추억에 연결된 기존 MemorySchedule을 모두 삭제
            deleteMany: {},
            create: schedules.map((dailyData: any) => ({
              day: dailyData.day,
              date: new Date(dailyData.date),
              scheduleList: {
                create: dailyData.scheduleList.map((list: any) => ({
                  type: list.type,
                  day: list.day,
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
    });

    return successResponse(updatedMemory);
  } catch (error) {
    console.error('@@ 추억 수정 에러 >>', error);
    return errorResponse('추억 수정 중 오류가 발생했습니다.', 500);
  }
}

/** 추억 삭제 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  const memoryId = Number(params.id);
  if (!memoryId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const deletedMemory = await prisma.memory.delete({
      where: { id: memoryId, userId: currentUserId },
    });

    if (deletedMemory.imageUrl && deletedMemory.imageUrl.length > 0) {
      await Promise.all(
        deletedMemory.imageUrl.map((url) => deleteCloudinary(url)),
      );
    }

    return successResponse();
  } catch (error) {
    console.error('@@ 추억 삭제 에러 >>', error);
    return errorResponse();
  }
}
