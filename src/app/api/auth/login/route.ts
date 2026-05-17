/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 로그인 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, rememberMe } = body;

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

    // 비밀번호 확인
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: '이메일 또는 비밀번호를 다시 확인해주세요.' },
        { status: 401 },
      );
    }

    const userInfoForToken = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
    };

    const accessToken = jwt.sign(
      userInfoForToken,
      process.env.JWT_SECRET as string,
      { expiresIn: rememberMe ? '30d' : '1d' },
    );

    return NextResponse.json(
      {
        message: '로그인에 성공했습니다.',
        user: {
          id: findUser.id,
          email: findUser.email,
          name: findUser.name,
          imageURL: findUser.profileImageUrl,
          accessToken,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
