/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 로그인 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    // 입력 유효성 검사
    if (!email || !password) {
      return NextResponse.json(
        { message: '이메일 또는 비밀번호를 입력해주세요.' },
        { status: 400 },
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    // 이미 가입되어 있는지 유효성 검사
    if (!findUser) {
      return NextResponse.json(
        { message: '이메일 또는 비밀번호를 다시 확인해주세요.' },
        { status: 401 },
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password!);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: '이메일 또는 비밀번호를 다시 확인해주세요.' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        message: '로그인에 성공했습니다.',
        user: { email: findUser.email, name: findUser.name },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
