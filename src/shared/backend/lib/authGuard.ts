/**
 * @file: authGuard.ts
 * @author: chad
 * @since: 2026.05.18 ~
 * @description: 백엔드에서 api 요청 받을 시 header의 Authorization 검증
 */

import { NextResponse } from 'next/server';
import { auth } from '@/app/api/[...nextauth]/route';

export async function authGuard(request: Request) {
  const authorization = request.headers.get('Authorization');

  /** 토큰의 존재 여부 */
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        { error: '토큰이 누락되었거나 올바르지 않은 형식입니다.' },
        { status: 401 },
      ),
    };
  }

  const token = authorization.split(' ')[1];
  const session = await auth();

  /** 토큰의 만료 여부 */
  if (!session || !session.user || (session as any).accessToken !== token) {
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        { error: '토큰이 만료되었거나 인증에 실패했습니다.' },
        { status: 401 }
      ),
    };
  }

  // 3. 검증 성공 시 세션 정보 반환
  return {
    isValid: true,
    session,
  };
}
