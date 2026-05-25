/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.25 ~
 * @description: 타임라인 대시보드 api
 */

import { prisma } from '@/shared/lib/prisma';
import { authGuard } from '@/shared/backend/lib/authGuard';
import {
  successResponse,
  errorResponse,
} from '@/shared/backend/utils/apiResponse';
import { getTravelDay } from '@/shared/lib/utils';

/** 타임라인 대시보드 통계 조회 */
export async function GET(request: Request) {
  const authValidate = await authGuard(request);
  if (!authValidate.isValid) return authValidate.errorResponse;

  const currentUserId = authValidate.session?.user?.id;
  if (!currentUserId) return errorResponse('잘 못 된 접근입니다.', 403);

  try {
    // 여행 추출
    const lastTravels = await prisma.travel.findMany({
      where: {
        userId: currentUserId,
        to: { lt: new Date() },
      },
      select: {
        travelType: true,
        from: true,
        to: true,
        cities: {
          select: { name: true, countryCode: true },
        },
      },
    });

    // 내 지출 합계
    const myTotalExpense = await prisma.expenseSpender.aggregate({
      where: {
        member: {
          userId: currentUserId,
        },
      },
      _sum: {
        calcExchangeAmount: true,
      },
    });

    // 총 여행일수
    let totalTravelDays = 0;
    // 여행한 해외 국가
    const worldCountries = new Set<string>();
    // 여행한 해외 도시
    const worldCities = new Set<string>();
    // 여행한 국내 도시
    const domesticCities = new Set<string>();

    lastTravels.forEach((travel) => {
      totalTravelDays += getTravelDay(travel.from, travel.to);

      travel.cities.forEach((city) => {
        if (travel.travelType === 'domestic' || city.countryCode === 'KR') {
          domesticCities.add(city.name);
        } else {
          worldCountries.add(city.countryCode);
          worldCities.add(city.name);
        }
      });
    });

    const responseData = {
      worldCountryCount: worldCountries.size,
      worldCityCount: worldCountries.size,
      domesticCityCount: domesticCities.size,
      totalTravelDays,
      totalMyExpense: myTotalExpense._sum.calcExchangeAmount || 0,
    };

    return successResponse(responseData);
  } catch (error) {
    console.log('@@ 타임라인 조회 에러', error);
    return errorResponse();
  }
}
