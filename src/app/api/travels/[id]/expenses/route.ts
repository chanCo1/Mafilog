/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.19 ~
 * @description: 내 여행 상세 > 가계부 관련 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import { IExpenseRequest } from '@/features/myTravel/interfaces/expense.interface';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';

/** 여행 가계부(지출) 조회 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const expense = await prisma.travelExpense.findMany({
      where: { travelId },
      orderBy: { day: 'asc' },
      include: {
        expenseList: {
          include: {
            spender: {
              include: {
                member: true,
              },
            },
            payer: true,
          },
        },
      },
    });

    return successResponse(expense);
  } catch (error) {
    console.error('@@ 여행 상세 가계부 조회 에러 >>', error);
    return errorResponse();
  }
}

/** 가계부 지출 등록 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const body = (await request.json()) as IExpenseRequest;
    const {
      day,
      // date,
      name,
      paymentType,
      spenderType,
      category,
      time,
      memo,
      amount,
      calcFormula,
      calcExchangeAmount,
      currencyCode,
      currencyCountry,
      exchangeRateAmount,
      payerId,
      spenders,
    } = body;

    if (
      day === undefined ||
      !name ||
      !paymentType ||
      !spenderType ||
      !category ||
      amount === undefined ||
      !payerId
    ) {
      return errorResponse('필수 데이터가 없습니다.', 400);
    }

    if (!spenders.length) return errorResponse('지출자가 없습니다.', 400);

    const createExpense = await prisma.$transaction(async (tx) => {
      let travelExpense = await tx.travelExpense.findFirst({
        where: { travelId, day },
      });

      if (!travelExpense) {
        travelExpense = await tx.travelExpense.create({
          data: {
            day,
            // date: date ? new Date(date) : null,
            travelId,
            dailyExpense: 0,
          },
        });
      }

      const lastExpense = await tx.expenseList.findFirst({
        where: { travelExpenseId: travelExpense.id },
        orderBy: { order: 'desc' },
        select: { order: true },
      });

      const lastOrder = lastExpense?.order ?? -1;

      const payerMember = await tx.travelMember.findFirst({
        where: {
          travelId: travelId,
          userId: payerId,
        },
      });

      if (!payerMember) {
        return errorResponse(
          '결제자를 여행 멤버 중에서 찾을 수 없습니다.',
          400,
        );
      }

      const mappedSpenders = await Promise.all(
        spenders.map(async (spender) => {
          const targetMember = await tx.travelMember.findFirst({
            where: { travelId, userId: spender.memberId },
          });

          if (!targetMember) throw new Error('지출자를 찾을 수 없습니다.');

          return {
            amount: spender.amount,
            name: spender.name,
            calcExchangeAmount: spender.calcExchangeAmount,
            category,
            currencyCode,
            currencyCountry,
            memberId: targetMember.id,
          };
        }),
      );

      await tx.expenseList.create({
        data: {
          name,
          paymentType,
          spenderType,
          category,
          day,
          order: lastOrder + 1,
          time: time || null,
          memo: memo || null,
          amount,
          calcFormula,
          calcExchangeAmount,
          currencyCode,
          currencyCountry,
          exchangeRateAmount,
          travelExpenseId: travelExpense.id,
          payerId: payerMember.id,
          spender: {
            create: mappedSpenders,
          },
        },
        include: {
          spender: true,
          payer: true,
        },
      });
    });

    return successResponse(createExpense);
  } catch (error) {
    console.error('@@ 가계부 지출 등록 에러 >>', error);
    return errorResponse();
  }
}

/** 가계부 지출 수정 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const body = (await request.json()) as IExpenseRequest;
    const {
      id,
      day,
      // date,
      name,
      paymentType,
      spenderType,
      category,
      time,
      memo,
      amount,
      calcFormula,
      calcExchangeAmount,
      currencyCode,
      currencyCountry,
      exchangeRateAmount,
      payerId,
      spenders,
    } = body;

    if (
      day === undefined ||
      !name ||
      !paymentType ||
      !spenderType ||
      !category ||
      amount === undefined ||
      !payerId
    ) {
      return errorResponse('필수 데이터가 없습니다.', 400);
    }

    if (!spenders.length) return errorResponse('지출자가 없습니다.', 400);

    const updateExpense = await prisma.$transaction(async (tx) => {
      // 기존 지출 내역 찾기
      const originExpenseList = await tx.expenseList.findUnique({
        where: { id },
      });

      if (!originExpenseList) {
        return errorResponse('수정하려는 지출 내역을 찾을 수 없습니다.', 400);
      }

      // 일정에서 지출내역 찾기
      const targetExpense = await tx.travelExpense.findFirst({
        where: { travelId, day },
      });

      if (!targetExpense) {
      return errorResponse('변경하려는 일정을 찾지 못했습니다.', 404);
    }

      // if (!targetExpense) {
      //   targetExpense = await tx.travelExpense.create({
      //     data: {
      //       day,
      //       travelId,
      //       dailyExpense: 0,
      //     },
      //   });
      // }

      // 결제자 찾기
      const payerMember = await tx.travelMember.findFirst({
        where: { travelId, userId: payerId },
      });

      if (!payerMember) {
        return errorResponse('결제자를 찾을 수 없습니다.', 400);
      }

      // 지출자 매핑
      const mappedSpenders = await Promise.all(
        spenders.map(async (spender: any) => {
          const targetMember = await tx.travelMember.findFirst({
            where: { travelId, userId: spender.memberId },
          });

          if (!targetMember) throw new Error('지출자를 찾을 수 없습니다.');

          return {
            amount: spender.amount,
            name: spender.name,
            calcExchangeAmount: spender.calcExchangeAmount,
            category,
            currencyCode,
            currencyCountry,
            memberId: targetMember.id,
          };
        }),
      );

      const lastExpense = await prisma.expenseList.findFirst({
        where: { travelExpenseId: targetExpense?.id },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      console.log('lastExpense >> ', lastExpense)

      const lastOrder = lastExpense?.order ?? -1;
      console.log('lastOrder >> ', lastOrder)

      // 지출 내역 업데이트
      await tx.expenseList.update({
        where: { id },
        data: {
          name,
          paymentType,
          spenderType,
          category,
          day,
          order:
            originExpenseList.day === day
              ? originExpenseList.order
              : lastOrder + 1,
          time: time || null,
          memo: memo || null,
          amount,
          calcFormula,
          calcExchangeAmount,
          currencyCode,
          currencyCountry,
          exchangeRateAmount,
          travelExpenseId: targetExpense?.id,
          payerId: payerMember.id,
          spender: {
            deleteMany: {},
            create: mappedSpenders,
          },
        },
        include: {
          spender: true,
          payer: true,
        },
      });
    });

    return successResponse(updateExpense);
  } catch (error) {
    console.error('@@ 지출 수정 에러 >>', error);
    return errorResponse();
  }
}

/** 가계부 지출 삭제 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const travelId = Number(params.id);
  if (!travelId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    const body = (await request.json()) as { deleteIds: number[] };
    const { deleteIds } = body;

    if (!deleteIds.length) {
      return errorResponse('삭제할 아이디가 없습니다.', 400);
    }

    await prisma.expenseList.deleteMany({
      where: {
        id: {
          in: deleteIds,
        },
      },
    });

    return successResponse();
  } catch (error) {
    console.error('@@ 지출 삭제 에러 >>', error);
    return errorResponse();
  }
}
