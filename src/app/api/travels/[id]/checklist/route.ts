/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 > 체크리스트 관련 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import { IChecklistRequest } from '@/features/myTravel/interfaces/checklist.interface';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

/** 내 여행 상세 조회 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const checklist = await prisma.checklistCategory.findMany({
      where: { travelId },
      orderBy: { createdAt: 'asc' },
      include: {
        items: { orderBy: { id: 'asc' } },
      },
    });

    return successResponse(checklist);
  } catch (error) {
    console.error('@@ 내 여행 상세 체크리스트 조회 에러 >>', error);
    return errorResponse();
  }
}

/** 체크리스트 등록 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  const body = (await request.json()) as IChecklistRequest;
  const { type, categoryId, label } = body;

  try {
    if (type === 'CATEGORY') {
      const newCategory = await prisma.checklistCategory.create({
        data: {
          travelId,
          label: label || '새 카테고리',
        },
        include: { items: true },
      });
      return successResponse(newCategory);
    }

    if (type === 'ITEM') {
      if (!categoryId || !label) {
        return NextResponse.json(
          { message: '카테고리 id 또는 카테고리명이 없습니다.' },
          { status: 400 },
        );
      }
      const newItem = await prisma.checklistItem.create({
        data: {
          categoryId: Number(categoryId),
          label,
        },
      });
      return successResponse(newItem);
    }
  } catch (error) {
    console.error('@@ 체크리스트 생성 에러 >>', error);
    return errorResponse();
  }
}

/** 체크리스트 수정 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);

  if (!travelId) {
    return errorResponse('잘 못 된 접근입니다.', 403);
  }

  const body = (await request.json()) as IChecklistRequest;
  const { type, categoryId, itemId, label, isChecked } = body;

  try {
    if (type === 'CATEGORY') {
      if (!categoryId || !label) {
        return errorResponse('카테고리 id 또는 카테고리명이 없습니다.', 400);
      }
      const updatedCategory = await prisma.checklistCategory.update({
        where: { id: Number(categoryId) },
        data: { label },
      });
      return successResponse(updatedCategory);
    }

    if (type === 'ITEM') {
      if (!itemId || isChecked === undefined) {
        return errorResponse('아이템 id 또는 체크 상태가 없습니다.', 400);
      }

      const updatedItem = await prisma.checklistItem.update({
        where: { id: Number(itemId) },
        data: { isChecked },
      });
      return successResponse(updatedItem);
    }
  } catch (error) {
    console.error('@@ 체크리스트 수정 에러 >>', error);
    return errorResponse();
  }
}

/** 체크리스트 삭제 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);

  if (!travelId) {
    return errorResponse('잘 못 된 접근입니다.', 403);
  }

  const body = (await request.json()) as IChecklistRequest;
  const { type, categoryId, itemId } = body;

  try {
    if (type === 'CATEGORY') {
      if (!type || !categoryId) {
        return errorResponse('필수 항목이 없습니다.', 400);
      }

      await prisma.checklistCategory.delete({
        where: { id: Number(categoryId) },
      });

      return successResponse();
    }

    if (type === 'ITEM') {
      if (!type || !itemId) {
        return errorResponse('필수 항목이 없습니다.', 400);
      }

      await prisma.checklistItem.delete({
        where: { id: Number(itemId) },
      });

      return successResponse();
    }
  } catch (error) {
    console.error('@@ 체크리스트 삭제 에러 >>', error);
    return errorResponse();
  }
}
