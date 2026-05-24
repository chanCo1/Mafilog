/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 유저 프로필 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import { uploadCloudinary } from '@/shared/backend/lib/cloudinary';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

export async function PATCH(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const files = formData.getAll('imageUrl') as File[];

    const uploadedUrls = await uploadCloudinary({ files });
    const imageUrl = uploadedUrls.length ? uploadedUrls[0] : null;

    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        name,
        profileImageUrl: imageUrl,
      },
    });

    return successResponse();
  } catch (error) {
    console.log('@@ 프로필 수정 에러', error);
    return errorResponse();
  }
}
