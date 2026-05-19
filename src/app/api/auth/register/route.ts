/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 회원가입 api
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import bcrypt from 'bcrypt';
import { getHexCode } from '@/shared/lib/utils';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, passwordConfirm } = body;

  try {
    // 입력 유효성 검사
    if (!email || !name || !password || !passwordConfirm) {
      return NextResponse.json(
        { message: '입력되지 않은 항목이 있습니다.' },
        { status: 400 },
      );
    }

    // 비밀번호 확인 유효성 검사
    if (password !== passwordConfirm) {
      return NextResponse.json(
        { message: '비밀번호가 일치하지 않습니다.' },
        { status: 400 },
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    // 이미 가입되어 있는지 유효성 검사
    if (findUser) {
      return NextResponse.json(
        { message: '이미 가입되어 있는 이메일입니다.' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hexCode = getHexCode();
    // 회원가입 생성
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
        hexCode: hexCode || '6f9dd3',
      },
    });

    return NextResponse.json(
      { message: '회원가입을 완료했어요' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
