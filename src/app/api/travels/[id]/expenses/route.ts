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
        expenseList: { include: { spender: true, payer: true } },
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

    if (!spenders.length)
      return errorResponse(
        '지출자가 없습니다.',
        400,
      );

    const result = await prisma.$transaction(async (tx) => {
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

      const newExpenseList = await tx.expenseList.create({
        data: {
          name,
          paymentType,
          spenderType,
          category,
          day,
          time: time || null,
          memo: memo || null,
          amount,
          calcFormula,
          calcExchangeAmount,
          currencyCode,
          currencyCountry,
          exchangeRateAmount,
          travelExpenseId: travelExpense.id,
          payerId: payerId,
          spender: {
            create: spenders.map((spender) => ({
              amount: spender.amount,
              calcExchangeAmount: spender.calcExchangeAmount,
              category,
              currencyCode,
              currencyCountry,
              memberId: spender.memberId,
            })),
          },
        },
        include: {
          spender: true,
          payer: true,
        },
      });

      const totalDailyAmount = await tx.expenseList.aggregate({
        where: { travelExpenseId: travelExpense.id },
        _sum: { calcExchangeAmount: true },
      });

      await tx.travelExpense.update({
        where: { id: travelExpense.id },
        data: {
          dailyExpense: totalDailyAmount._sum.calcExchangeAmount || 0,
        },
      });

      return newExpenseList;
    });

    return successResponse(result);
  } catch (error) {
    console.error('@@ 가계부 지출 등록 에러 >>', error);
    return errorResponse();
  }
}
