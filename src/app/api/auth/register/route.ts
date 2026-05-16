/**
 * @file: route.ts
 * @author: chad
 * @since: 2026.05.16 ~
 * @description: 회원가입 api
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IRegisterRequest } from '@/features/auth/interfaces/register.interface';

const prisma = new PrismaClient();

export async function POST(request: IRegisterRequest) {
  const { email, name, password, passwordConfirm } = request;

  try {
    // 입력 유효성 검사
    if (!email || !name || !password || passwordConfirm) {
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

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name,
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
