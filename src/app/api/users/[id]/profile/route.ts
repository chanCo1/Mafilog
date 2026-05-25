/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 유저 프로필 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  uploadCloudinary,
  deleteCloudinary,
} from '@/shared/backend/lib/cloudinary';
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
    const files = formData.getAll('imageUrl');

    const extractUser = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: { name: true, profileImageUrl: true }
    });

    if (!extractUser) {
      return errorResponse('유저 정보를 찾을 수 없습니다.', 404);
    }

    const originName = extractUser.name;
    const originImageUrl = extractUser.profileImageUrl;

    // 파일 분기처리
    const imageFiles = files.filter(
      (file) => typeof file !== 'string',
    ) as File[];
    const imageUrls = files.filter(
      (file) => typeof file === 'string',
    ) as string[];

    let imageUrl: string | null = null;

    if (imageFiles.length) {
      const uploadedUrls = await uploadCloudinary({ files: imageFiles });
      imageUrl = uploadedUrls.length ? uploadedUrls[0] : null;
    } else if (imageUrls.length) {
      imageUrl = imageUrls[0];
    } else {
      imageUrl = null;
    }

    if (name === originName && imageUrl === originImageUrl) {
      console.log('변경 사항이 없습니다.');
      return successResponse(extractUser);
    }

    // 기존 이미지 삭제
    if (originImageUrl && originImageUrl !== imageUrl) {
      if (originImageUrl.includes('cloudinary.com')) {
        deleteCloudinary(originImageUrl); 
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUserId },
      data: {
        name,
        profileImageUrl: imageUrl,
      },
    });

    return successResponse(updatedUser);
  } catch (error) {
    console.log('@@ 프로필 수정 에러', error);
    return errorResponse();
  }
}
