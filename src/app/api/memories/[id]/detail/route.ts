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
import { deleteCloudinary } from '@/shared/backend/lib/cloudinary';

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
